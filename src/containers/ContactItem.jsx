import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ name, emails, phoneNos }) => {
	debugger;
	return (
		<div>
			<span>{name.firstName}</span>
			<span>{emails[0]}</span>
			{/* <span>{phoneNos[0]}</span> */}
		</div>
	);
}

export default ExpenseListItem;
