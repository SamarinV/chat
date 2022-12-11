import UserModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import TokenService from "./token-service.js"
import UserDto from "../dtos/user-dto.js";

class userService {

	async registration({ name, email, password }) {
		const candidate = await UserModel.findOne({ email });
		if (candidate) {
			throw (new Error("Пользователь с таким email уже существует"));
		}
		const hashPassword = await bcrypt.hash(password, 3);//хэшируем пароль
		const user = await UserModel.create({ name, email, password: hashPassword });//сохраняем пользователя в БД

		const userDto = new UserDto(user);
		const refreshToken = TokenService.generateToken({ ...userDto });//создаем токен
		await TokenService.saveToken(userDto.id, refreshToken);//сохраняем токен в БД
		return { refreshToken, user: userDto };

	}

	async login(email, password) {
		const user = await UserModel.findOne({ email }); //ищем user по email
		if (!user) {
			throw new Error("Пользователя с таким именем не существует");
		}
		const isPassEquils = await bcrypt.compare(password, user.password); //сверяем пароли
		if (!isPassEquils) {
			throw new Error("Неправильный пароль");
		}
		const userDto = new UserDto(user);
		const refreshToken = TokenService.generateToken({ ...userDto });//создаем токен
		await TokenService.saveToken(userDto.id, refreshToken);//сохраняем токен в БД
		return { refreshToken, user: userDto };

	}

	async logout(refreshToken) {
		const token = await TokenService.removeToken(refreshToken);
		return token;
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw new Error('Токен отсутствует');
		}
		const userData = TokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await TokenService.findToken(refreshToken);
		if (!userData || !tokenFromDb) { // проверка что валидация и поиска в БД не успешны
			throw new Error('Ошибка в валидации токена или в БД')
		}
		const user = await UserModel.findById(userData.id);
		const userDto = new UserDto(user);
		refreshToken = TokenService.generateToken({ ...userDto });//создаем токен
		await TokenService.saveToken(userDto.id, refreshToken);//сохраняем токен в БД
		return { refreshToken, user: userDto };
	}

	async getAllUsers() {
		const users = await UserModel.find();
		return users;
	}
}

const UserService = new userService();

export default UserService;