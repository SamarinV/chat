import React, { useContext, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { Context } from '../index';
import {observer} from "mobx-react-lite";

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const {store} = useContext(Context)

	const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
	return (
		<div className={'authLoginConteiner'}>
			<Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите вашу почту!',
          },
        ]}
      >
        <Input
					prefix={<UserOutlined className="site-form-item-icon" />}
					placeholder="Почта"
					onChange={e => setEmail(e.target.value)}
					value={email}
				/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите ваш пароль!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Пароль"
					onChange={e => setPassword(e.target.value)}
					value={password}
        />
      </Form.Item>

      <Form.Item>
        <Button
					type="primary"
					htmlType="submit"
					className="login-form-button"
					onClick={() => {
						store.login(email, password);
					}}
					>
						<Link to="/chat">Войти</Link>
        </Button>
        <Link to="/registration">Зарегистрируйтесь сейчас</Link>
      </Form.Item>
    </Form>
		</div>
	);
}

export default observer(Login);