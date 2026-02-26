import mongoose from 'mongoose';
import PostSchema from './board.js';

export const Post = mongoose.model('Post', PostSchema);
