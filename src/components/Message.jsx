import React from 'react';
import formatDistanceToNow  from "date-fns/formatDistanceToNow";
import ruLocale from 'date-fns/locale/ru';

const Message = ({avatar, text, date, isMe, ...props}) => {
	
	return (
			isMe === false
				?
				<div className="message">
					<div className="message__conteiner">
						<div className="message__content">
							<img
								src={avatar}
								alt="avatar"
								className="message__avatar"
							/>
							<p className="message__text">
								{text}
							</p>
						</div>
						
						<span className="message__time">
							{formatDistanceToNow(new Date(date), {addSuffix: true, locale: ruLocale})}
						</span>
					</div>
				</div>
				:
				<div className="message message__my">
					<div className="message__conteiner">
						<div className="message__content">
							<img
								src={avatar}
								alt="avatar"
								className="message__avatar"
							/>
							<p className="message__text message__text_my">
								{text}
							</p>
						</div>
						
						<span className="message__time">
							{formatDistanceToNow(new Date(date), {addSuffix: true, locale: ruLocale})}
						</span>
					</div>
					<img src="#" alt="" className="message__isView"/>
				</div>
	);
}
// Message.defaultProps = {
// 	user: {}
// }
// Message.propTypes = {
// 	avatar: PropTypes.string,
// 	text: PropTypes.string,
// 	date: PropTypes.string,
// 	user: PropTypes.object,
// }
 
export default Message;