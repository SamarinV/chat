import React from 'react';
import Message from './Message';

const ListMessage = ({allMessages}) => {
	return (
		<div>
			{allMessages.map(item => <Message key={item.date} {...item} /> )}
		</div>
	);
}
 
export default ListMessage;