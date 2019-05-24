import bunyan from 'bunyan';
import express from 'express';
//var cors = require('cors');
import mongoose from 'mongoose';
import getMiddlewares from './middlewares';
import getModels from './models';
import getResourses from './resourses';
import getApi from './api';


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
		this.app.use(this.middlewares.reqLog);
		this.app.use(this.middlewares.accessLogger);
		this.app.use(this.middlewares.reqParser);
		/*this.app.use(this.resourses.Auth.parseToken);
		this.app.use(this.resourses.Auth.parseUser);*/
		//this.app.use('*',cors());
		/*this.app.use(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow_Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
			res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type, Authorization");
			res.header("Access-Control-Allow-Credentials", "true");
			next();
		});*/
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
			this.app.listen(this.config.port, () => {
				this.log.info(`App "${this.config.name}" running on port ${this.config.port}!`);
				resolve(this);
			});
		});
	}
}
