import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { API_URL } from '../http/index.js';
import AuthService from '../services/AuthService.js';

export default class Store {
	user = {};
	isAuth = false;
	isLoading = false;

	constructor() {
		makeAutoObservable(this);
	}

	setAuth(bool) {
		this.isAuth = bool;
	}

	setUser(user) {
		this.user = user;
	}
	setLoading(bool) {
		this.isLoading = bool;
	}

	async login(email, password) {
		try {
			const response = await AuthService.login(email, password);
			console.log(response);
			localStorage.setItem('token', response.data.refreshToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (e) {
			console.log(e.message);
		}
	}

	async registration(name, email, password) {
		try {
			const response = await AuthService.registration(name, email, password);
			localStorage.setItem('token', response.data.refreshToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (e) {
			console.log(e.response?.data?.message);
		}
	}

	// async getName(email)

	async logout() {
		try {
			const response = await AuthService.logout();
			console.log(response);
			localStorage.removeItem('token');
			this.setAuth(false);
			this.setUser({});
		} catch (e) {
			console.log(e.response?.data?.message);
		}
	}

	async checkAuth() {
		this.setLoading(true);
		try {
			const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
			console.log(response)
			localStorage.setItem('token', response.data.refreshToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (e) {
			console.log(e.response?.data?.message);
		} finally {
			this.setLoading(false);
		}
	}
}