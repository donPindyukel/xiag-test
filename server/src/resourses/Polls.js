import mongoose from 'mongoose';

const polls = (ctx) => {
	const resourse = {};
	const Polls = ctx.models.Polls;
	const Users = ctx.models.Users;

	resourse.createQuestion = async (req, res) => {
		try {
			const polls = new Polls(req.body);
			await polls.save();
			return res.json(polls);
		} catch(err) {
			console.log(err);
			return res.status(500).json(err);
		}
	};

	resourse.getPoll = async (req, res) => {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.json(null);
		}
		try {
			const poll = await Polls.findOne({_id: req.params.id});
			return res.json(poll);
		} catch(err) {
			console.log(err);
			return res.status(500).json(err);
		}
	};

	resourse.getPollStat = async (req, res) => {
		try {
			const users = await Users.aggregate([
				{$unwind: '$answers'},
				{
					$lookup: {
						from: 'polls',
						localField: 'answers.questionId',
						foreignField: '_id',
						as: 'result'
					}
				},
				{
					$project: {
						name: 1,
						answers: 1,
						'result.question': 1,
						'result.answers': 1
					}
				}
			]);
			users.forEach(user => {
				const answers = user.result[0].answers
					.filter(answer => user.answers.answerId.toString() === answer._id.toString());
				user.result[0].answers = [...answers];
			});
			return res.json(users);
		} catch(err) {
			console.log(err);
			return res.status(500).json(err);
		}
	};

	return resourse
};

export default polls;