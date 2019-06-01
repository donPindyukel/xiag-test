import bunyan from 'bunyan';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'http';
import getMiddlewares from './middlewares';
import getModels from './models';
import getResourses from './resourses';
import getApi from './api';
import { socketHandlers } from "./sockets/SockServer";

export default class App {
	constructor(params = {}) {
		Object.assign(this, params);
		if (!this.log) this.log = this.getLogger();
		this.init();
	}

	getLogger(params) {
		return bunyan.createLogger(Object.assign({
			name: 'app',
			src: __DEV__,
			level: 'trace',
		}, params))
	}

	getMiddlewares() {
		return getMiddlewares(this);
	}

	getModels() {
		return getModels(this);
	}

	getDatabase() {
		return () => mongoose.connect(this.config.db.url, {useNewUrlParser: true});
	}

	getResourses() {
		return getResourses(this);
	}

	init() {
		this.log.trace('App init');

		this.app = express();
		this.db = this.getDatabase();

		this.middlewares = this.getMiddlewares();
		this.log.trace('middlewares', Object.keys(this.middlewares));

		this.models = this.getModels();
		this.log.trace('models', Object.keys(this.models));

		this.resourses = this.getResourses();
		this.log.trace('resourses', Object.keys(this.resourses));


		this.useMiddlewares();
		this.useRoutes();
		this.useDefaultRoute();
	}

	useMiddlewares() {
		this.app.use(cors());
		this.app.use(this.middlewares.reqLog);
		this.app.use(this.middlewares.accessLogger);
		this.app.use(this.middlewares.reqParser);
	}

	useRoutes() {
		const api = getApi(this);
		this.app.use('/api', api);
	}

	useDefaultRoute() {
		this.app.use((req, res, next) => {
			const err = ('Route not found');
			next(err);
		});
	}

	run() {
		this.log.trace('App run');
		try {
			this.db();
		} catch (err) {
			this.log.fatal(err);
		}

		return new Promise((resolve) => {
			const server = Server(this.app);
			const io = require('socket.io')(server);
			io.on('connection', socketHandlers);
			server.listen(this.config.port, () => {
				this.log.info(`App "${this.config.name}" running on port ${this.config.port}!`);
				resolve(this);
			});
		});
	}
};
