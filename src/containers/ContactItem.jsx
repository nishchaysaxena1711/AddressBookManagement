import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ name, emails, phoneNos }) => (
	<div>
		<span>{name}</span>
		<span>{emails[0]}</span>
		<span>{phoneNos[0]}</span>
	</div>
);

export default ExpenseListItem;
