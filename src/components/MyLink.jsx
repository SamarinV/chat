import { Link, useMatch } from "react-router-dom";


const MyLink = ({children, to, ...props}) => {
	const match = useMatch(to)
	return (
		<Link
			to={to}
			{...props}
			className={`header__link ${match ? 'header__link_active' : ''}`}
		>
			{children}
		</Link>
	);
}
 
export default MyLink;

