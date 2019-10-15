import React, {Component} from 'react';
import { connect } from 'react-redux';
import ContactForm from './ContactForm.jsx';
import { createContactDetails } from '../actions/actions.js';

const CreateNewContactDetails = (props) => {
	return (
		<div>
			CreateNewContactDetails
			<ContactForm
				onSubmit={(contactDetails) => {
					props.dispatch(createContactDetails(contactDetails));
					props.history.push('/');
				}}
			/>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		contactLists: state
	};
};

export default connect(mapStateToProps)(CreateNewContactDetails);