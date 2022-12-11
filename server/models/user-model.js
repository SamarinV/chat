import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, unique: true, required: true },//емаил, уникальный, обязательный
	password: { type: String, required: true },//пароль обязательный
})
const UserModel = model('User', userSchema);

// module.exports = model('User', UserSchema)
export default UserModel;
