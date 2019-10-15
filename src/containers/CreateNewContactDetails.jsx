import React, {Component} from 'react';
import { connect } from 'react-redux';
import ContactForm from './ContactForm.jsx';

const CreateNewContactDetails = (contactLists) => {
	return (
		<div>
			CreateNewContactDetails
			<ContactForm
				onSubmit={(expense) => {
					props.dispatch(addExpense(expense));
					props.history.push('/');
				}}
			/>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		contactLists: state.contactLists
	};
};

export default connect(mapStateToProps)(CreateNewContactDetails);