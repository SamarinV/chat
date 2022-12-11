import jwt from "jsonwebtoken";
import TokenModel from "../models/token-model.js";


class tokenService {
	generateToken(payload) {
		// const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30d' });
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
		return refreshToken // { accessToken, refreshToken };
	}
	async saveToken(userId, refreshToken) {
		const tokenData = await TokenModel.findOne({ user: userId })
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		const token = await TokenModel.create({ user: userId, refreshToken })
		return token;
	}

	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}

	async removeToken(refreshToken) {
		const tokenData = await TokenModel.deleteOne({ refreshToken });
		return tokenData;
	}
	async findToken(refreshToken) {
		const tokenData = await TokenModel.findOne({ refreshToken });
		return tokenData;
	}
};

const TokenService = new tokenService()

export default TokenService;