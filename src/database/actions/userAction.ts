'use server';

import User from '../models/User';
import connectDb from '../connect-db';
export interface IUser {
  uid: string;
  email: string | null;
  name: string;
  location?: string;
  createdAt: Date;
  profileImageUrl?: string;
  followers?: string[];
  following?: string[];
  likedPosts?: string[];
}

const addUser = async ({uid, email, name}: IUser) => {
  try {
    await connectDb();
    const newUser = new User({uid, email, name});
    const res = await newUser.save();
  } catch (error) {
    throw new Error('Error while creating user');
  }
};

export {addUser};
