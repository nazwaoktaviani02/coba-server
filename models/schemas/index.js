import mongoose from 'mongoose';
import PostSchema from './board.js';
import UserSchema from './user.js';

export const Post = mongoose.model('Post', PostSchema);
export const User = mongoose.model('User', UserSchema);
