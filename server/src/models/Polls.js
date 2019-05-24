import mongoose from 'mongoose';

const polls = (ctx) => {

	const schema = new mongoose.Schema({
		question: String,
		answers: [
			{
				title: String,
			}
		]
	}, {
		collection: 'polls',
		timestamps: true,
	});

	return mongoose.model('Polls', schema)
};

export default polls;