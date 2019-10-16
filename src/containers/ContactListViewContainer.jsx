import React, {Component} from 'react';
import { connect } from 'react-redux';
import ContactItem from './ContactItem.jsx';
import styled from 'styled-components';

const EmptyContactContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10px 0;
`;

const ContactListContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10px 0;
`;

const ContactListViewContainer = (props) => {
	return (
		<ContactListContainer>
			<h1>Contact List</h1>
			{
				props.contactLists.length !== 0
				? props.contactLists.map((contact) => {
					return <ContactItem key={contact.id} {...contact} />;
				})
				: <EmptyContactContainer>
					<h3>Currently, you don't have any contacts in your book.</h3>
					<h3>Press click contact link to create accounts.</h3>
				</EmptyContactContainer>
			}
		</ContactListContainer>
	);
}

const mapStateToProps = (state) => {
	return {
		contactLists: state
	};
};

export default connect(mapStateToProps)(ContactListViewContainer);