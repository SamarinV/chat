import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

import SendOutlined from '@ant-design/icons/SendOutlined'

import ListMessage from '../components/ListMessage'



const { TextArea } = Input;

const Chat = () => {
	const [value, setValue] = useState('');

	const [allMessages, setAllMessages] = useState([
				// {
				// 	avatar: "https://e7.pngegg.com/pngimages/263/201/png-clipart-computer-icons-avatar-admission-miscellaneous-logo.png",
				// 	text: 'Xnj nj yfgbcfk Xnj nj yfgbcfk Xnj nj yfgbcfk Xnj nj yfgbcfk Xnj nj yfgbcfk Xnj nj yfgbcfk Xnj nj yfgbcfk',
				// 	date: '2022-11-17T13:00:00',
				// 	isMe: false
				// },
				// {
				// 	avatar: "https://e7.pngegg.com/pngimages/263/201/png-clipart-computer-icons-avatar-admission-miscellaneous-logo.png",
				// 	text: 'Xnj nj yfgbcfk Xnj nj yfgbcfk Xnj nj yfgbcfk Xnj nj yfgbcfk Xnj nj yfgbcfk Xnj nj yfgbcfk Xnj nj yfgbcfk',
				// 	date: '2022-11-17T13:06:00',
				// 	isMe: true
				// },
])

useEffect(() => {
	const raw = localStorage.getItem('allMessages') || []
	setAllMessages(JSON.parse(raw))
}, [])

useEffect(() => {
	localStorage.setItem("allMessages", JSON.stringify(allMessages));
}, [allMessages]);


	const sendMessage = () => {
		setAllMessages([...allMessages, 
				{
					avatar: "https://e7.pngegg.com/pngimages/263/201/png-clipart-computer-icons-avatar-admission-miscellaneous-logo.png",
					text: value,
					date: new Date(),
					isMe: true
				}
			]);
			setValue('')
	}
	

	return ( 
		<div className="chat">

			<div className="chat__content">

				<div className="chat__with-who">Список собеседников</div>

				<div className="chat__messages">
					{/* {messages} */}
					<ListMessage allMessages={allMessages} />

					<div className="chat__write-message">
						<TextArea
							className='chat__text-area'
							value={value}
							onChange={e => setValue(e.target.value)}
							placeholder="Здесь можно написать ваше сообщение"
							autoSize={{ minRows: 2, maxRows: 3 }}
						/>
						<SendOutlined 
							style={{height: '54px', width: '54px', fontSize: 35, cursor: 'pointer'}}
							onClick={sendMessage}
						/>
					</div>
					
				</div>
			</div>
			
			
		</div>
	 );
}
 
export default Chat;