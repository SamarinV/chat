// const authMiddleware = (req, res, next) => {
// 	try {

// 	} catch (e) {
// 		resizeBy.status(401).json({ message: 'Пользователь не авторизован' })
// 	}
// }

// export default authMiddleware;
import TokenService from "../service/token-service.js";

export default function (req, res, next) {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			res.status(400).json({ message: 'Пользователь не авторизован' });
		}

		const accessToken = authorizationHeader.split(' ')[1];
		if (!accessToken) {
			res.status(400).json({ message: "Пользователь не авторизован" });
		}

		const userData = TokenService.validateRefreshToken(accessToken)
		if (!userData) {
			res.status(400).json({ message: "Пользователь не авторизован" });
		}
		req.user = userData;
		next();
	} catch (e) {
		res.status(500).json({ message: "Ошибка в authMiddleware" });
	}
}