import React, {Component} from 'react';
import { connect } from 'react-redux';
import ContactItem from './ContactItem.jsx';

const ContactListViewContainer = (props) => {
	return (
		<div>
			<h1>ContactListViewContainer</h1>
			{
				props.contactLists.map((contact) => {
					return <ContactItem key={contact.id} {...contact} />;
				})
			}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		contactLists: state.contactLists
	};
};

export default connect(mapStateToProps)(ContactListViewContainer);