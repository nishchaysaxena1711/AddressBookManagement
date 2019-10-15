import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Routes = styled.div`
	display: flex;
	
	a {
		margin: 0 15px;
		color: #000;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}
`;

const Head = styled.header`
	align-items: center;
    display: flex;
    flex-direction: column;
`;

const Header = () => (
	<Head>
		<h2>Welcome to address book managment portal !</h2>
		<Routes>
			<NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
			<NavLink to="/create" activeClassName="is-active">Create Contact</NavLink>
			<NavLink to="/help" activeClassName="is-active">Help</NavLink>
		</Routes>
	</Head>
);

export default Header;
