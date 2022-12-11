import TokenService from "../service/token-service.js";
import UserService from "../service/user-service.js";


class UserController {
	async registration(req, res, next) {
		try {
			const { name, email, password } = req.body;
			const userData = await UserService.registration({ name, email, password })
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 2592000000, httpOnly: false })
			return res.json(userData)
		} catch (e) {
			res.status(400).json({ message: 'Такой пользователь уже зарегистрирован' });
		}
	}
	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await UserService.login(email, password)
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 2592000000, httpOnly: true })
			return res.json(userData)
		} catch (e) {
			res.status(401).json({ message: 'Такого пользователя не найдено' });
		}
	}
	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const token = await UserService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json(token);
		} catch (e) {
			res.status(500).json(e.message);
		}
	}
	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await UserService.refresh(refreshToken)
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 2592000000, httpOnly: true })
			return res.json(userData)
		} catch (e) {
			res.status(500).json(e.message);
		}
	}
	async getUsers(req, res, next) {
		try {
			const users = await UserService.getAllUsers();
			return res.json(users);
		} catch (e) {
			res.status(500).json(e.message);
		}
	}
}

export default new UserController()