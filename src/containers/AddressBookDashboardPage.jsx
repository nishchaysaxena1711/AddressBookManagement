import React from 'react';
import styled from 'styled-components';
import ContactListViewContainer from './ContactListViewContainer.jsx';

const AddressBookDashboard = styled.div`
	align-items: center;
    display: flex;
    flex-direction: column;
	border: 1px solid #000;
	margin: 30px 0 0;
	height: 600px;
	overflow: scroll;
`;

const AddressBookDashboardPage = () => (
	<AddressBookDashboard>
		<ContactListViewContainer />
	</AddressBookDashboard>
);

export default AddressBookDashboardPage;