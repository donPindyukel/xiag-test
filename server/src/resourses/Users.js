import mongoose from "mongoose";

const users = (ctx) => {
	const resourse = {};
	const Users = ctx.models.Users;

	resourse.addUser = async (req, res) => {
		try {
			const user = new Users({
				name: req.body.name,
				answers: []
			});
			await user.save();
			res.json(user);
		} catch(err) {
			console.log(err);
			return res.status(500).json(err);
		}
	};

	resourse.getUser = async (req, res) => {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.json(null);
		}
		try {
			const user = await Users.findOne({_id: req.params.id});
			return res.json(user);
		} catch(err) {
			console.log(err);
			return res.status(500).json(err);
		}
	};

	resourse.addUsersAnswer = async (req, res) => {
		try {
			const user = await Users.findById(req.body.id);
			if (!user) {
				throw Error(500);
			}
			user.answers.push(req.body.answer);
			await user.save();
			return res.json(user);
		} catch(err) {
			console.log(err);
			return res.status(500).json(err);
		}
	};

	return resourse
};

export default users;