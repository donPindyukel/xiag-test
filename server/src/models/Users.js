import mongoose from 'mongoose';

const users = (ctx) => {

	const schema = new mongoose.Schema({
		name: String,
		answers: [
			{
				questionId: mongoose.Schema.Types.ObjectId,
				answerId: mongoose.Schema.Types.ObjectId,
			}
		]
	}, {
		collection: 'users',
		timestamps: true,
	});

	schema.virtual('id').get(function(){
		return this._id.toHexString();
	});

	schema.set('toJSON', {
		virtuals: true
	});

	return mongoose.model('Users', schema)
};

export default users;