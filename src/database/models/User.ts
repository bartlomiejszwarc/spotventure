import {ObjectId} from 'mongodb';
import {model} from 'mongoose';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  email: {type: String, required: true},
  name: {type: String, required: true},
  location: {type: String, required: false},
  createdAt: {type: Date, default: Date.now},
  profileImageUrl: {type: String, required: false},
  followers: {type: [String], default: [], required: false},
  following: {type: [String], default: [], required: false},
  likedPosts: {type: [String], default: [], required: false},
});

export default mongoose.models.User || model('User', userSchema);
