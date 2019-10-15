import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
	<header>
		<h1>Address Book Management</h1>
		<NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
		<NavLink to="/create" activeClassName="is-active">Create Contact</NavLink>
		<NavLink to="/help" activeClassName="is-active">Help</NavLink>
	</header>
);

export default Header;
