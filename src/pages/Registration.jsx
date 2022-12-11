import { Button, Form, Input} from 'antd';
import React, { useContext, useState } from 'react';
import {Context} from '../index';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Registration = () => {
  const [form] = Form.useForm();
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const {store} = useContext(Context)

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
		<div className={'authLoginConteiner'} style={{width: 400}}>
    <Form>

      <Form.Item
        name="nickname"
        label="Ваше имя"
				help
        rules={[

					{ 
						validator(_, value) {
              if (value.length >= 3) {
                return Promise.resolve();
              }
							
              return Promise.reject(new Error(''));
            }
					},

          {
            required: false,
            message: 'Пожалуйста, введите ваше имя',
            whitespace: true,
          },
        ]}
      >
        <Input onChange={e => setName(e.target.value)}/>
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'Введен некорректный адрес почты',
          },
          {
            required: true,
            message: 'Пожалуйста, введите вашу почту',
          },
        ]}
      >
        <Input onChange={e => setEmail(e.target.value)} />
      </Form.Item>

      <Form.Item
        name="password"
        label="Пароль"
				size="small"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите пароль',
          },
        ]}
        hasFeedback
      >
        <Input.Password onChange={e => setPassword(e.target.value)} />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Повторите пароль"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Пожалуйста, повторите пароль',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      
      <Form.Item {...tailFormItemLayout}>
        <Button

					
					onClick={() => store.registration(name, email, password)}
					type="primary"
					htmlType="submit"
				>
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
		</div>
  );
};
export default Registration;