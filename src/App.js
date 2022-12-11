import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Error from './pages/error-page'
import Layout from './components/Layout';
import Registration from './pages/Registration';
import { Context } from './index';
import { observer } from 'mobx-react-lite';



function App() {
	const { store } = useContext(Context);
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					{store.isAuth
						?
						<>
							<Route index element={<About />}></Route>
							<Route path='chat' element={<Chat />}></Route>
							<Route path='*' element={<Error />}></Route>
						</>
						:
						<>
							<Route index element={<About />}></Route>
							<Route path='login' element={<Login />}></Route>
							<Route path='registration' element={<Registration />}></Route>
							<Route path='*' element={<Error />}></Route>
						</>
					}
				</Route>
			</Routes>
		</>
	);
}

export default observer(App);
