import { Schema, model } from 'mongoose';
// const { Schema, model } = mongoose;

const tokenSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	refreshToken: { type: String, required: true },
	// accessToken: { type: String, required: true }
})

const TokenModel = model('Token', tokenSchema)

export default TokenModel;