import * as mongoose from 'mongoose';

export interface User {
    username: string,
    age: number,
    sex: string,
    email?: string,
    phone?: string,
}

export interface UserModel extends User, mongoose.Document {
    password: string,
}

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },

    username: {
        type: String,
        required: true
    }
})