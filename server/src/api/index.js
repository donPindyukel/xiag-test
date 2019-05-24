import { AsyncRouter } from 'express-async-router';

export default (ctx) => {
	const api = AsyncRouter();

	api.post('/polls', ctx.resourses.Polls.createQuestion);
	api.get('/polls', ctx.resourses.Polls.getPollStat);
	api.post('/user', ctx.resourses.Users.addUser);
	api.put('/user', ctx.resourses.Users.addUsersAnswer);

	return api;
}
