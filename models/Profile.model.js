const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'useer'
	},
	company: {
		type: String
	},
	website: {
		type: String
	},
	location: {
		type: String
	},
	status: {
		type: String
	},
	skills: {
		type: [ String ],
		required: true
	},
	bio: {
        type:String
    },
    githubusername:{
        type:String
    },
});
