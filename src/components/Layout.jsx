import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MyLink from "./MyLink";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Layout = () => {
	// const setActive = ({isActive}) => isActive ? 'header__link_active' : '';

	const {store} = useContext(Context);

	// (async () => {
	// 		// if(localStorage.getItem('token')){
	// 		await store.checkAuth()
	// 	// }
	// 	})()

	useEffect(() => {
		(async () => {
			// if(localStorage.getItem('token')){
			await store.checkAuth()
		console.log("сработал useEffect")
		// }
		})()
	}, []);


	return (
		<div className={'wrapper'}>

			<header>{store.isAuth ?
				<>
				<h3 style={{color: 'white'}}>{`${store.user.email}`}</h3>
				<MyLink to="/">О сайте</MyLink>
				<MyLink to='/chat'>Чат</MyLink>
				<MyLink to='/login' onClick={() => store.logout()}>Выйти</MyLink>
				{console.log(store.isAuth)}
				</>
			:
				<>
				<MyLink to="/">О сайте</MyLink>
				<MyLink to='/login'>Вход</MyLink>
				{console.log('false в isAuth')}
				</>
				}
			</header>

			<main  className={'content'}>
				{store.isLoading ? <h1>ЗАГРУЗКА!!!</h1> : <Outlet /> }
			</main>

			<footer>
				<h5>2022</h5>
			</footer>
		</div>
	);
}
 
export default observer(Layout);