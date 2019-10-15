import React, {Component} from 'react';
import { connect } from 'react-redux';
import ContactItem from './ContactItem.jsx';

const ContactListViewContainer = (props) => {
	console.log(this, props);
	return (
		<div>
			<h1>ContactListViewContainer</h1>
			{
				props.contactLists.length !== 0
				? props.contactLists.map((contact) => {
					return <ContactItem key={contact.id} {...contact} />;
				})
				: <h3>You have no contacts.</h3>
			}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		contactLists: state
	};
};

export default connect(mapStateToProps)(ContactListViewContainer);