import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const  UserSchema = new Schema({
    email: { type: String, unique: true, require: true},
    password: { type: String, require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    tc: { type: Number, require: true, unique: true, min: 10000000000, max: 99999999999},
    tel: { type: Number, require: true },
    isAdmin: { type: Boolean, require: true, default: false},
    createdDate: { type: Date, default: Date.now },
});

const UserModel = mongoose.model('User', UserSchema);
export {UserModel};