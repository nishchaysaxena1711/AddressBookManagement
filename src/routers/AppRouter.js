import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RoomSelectionDashboard from '../containers/RoomSelectionDashboard.jsx';
import HelpPage from '../containers/HelpPage.jsx';
import Header from '../containers/Header.jsx';

const AppRouter = () => (
	<BrowserRouter>
		<React.Fragment>
			<Header />
			<Switch>
				<Route path="/" component={RoomSelectionDashboard} exact={true} />
				<Route path="/help" component={HelpPage} />
			</Switch>
		</React.Fragment>
	</BrowserRouter>
);

export default AppRouter;
