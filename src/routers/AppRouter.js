import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import AddressBookDashboardPage from '../containers/AddressBookDashboardPage.jsx';
import CreateNewContactDetails from '../containers/CreateNewContactDetails.jsx';
import HelpPage from '../containers/HelpPage.jsx';
import NotFoundPage from '../containers/NotFoundPage.jsx';
import Header from '../containers/Header.jsx';

const AppRouter = () => (
	<BrowserRouter>
		<div>
			<Header />
			<Switch>
				<Route path="/" component={AddressBookDashboardPage} exact={true} />
				<Route path="/create" component={CreateNewContactDetails} />
				<Route path="/help" component={HelpPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</BrowserRouter>
);

export default AppRouter;
