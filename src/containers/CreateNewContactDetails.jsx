import React, {Component} from 'react';
import { connect } from 'react-redux';
import ContactForm from './ContactForm.jsx';
import { createContactDetails } from '../actions/actions.js';
import styled from 'styled-components';

const CreateNewContactDetailsContainer = styled.div`
	border: 1px solid #000;
	border-radius: 5px;
	margin-top: 30px;
	padding: 10px;
`;

const CreateNewContactDetails = (props) => {
	return (
		<CreateNewContactDetailsContainer>
			<ContactForm
				onSubmit={(contactDetails) => {
					props.dispatch(createContactDetails(contactDetails));
					props.history.push('/');
				}}
			/>
		</CreateNewContactDetailsContainer>
	);
}

const mapStateToProps = (state) => {
	return {
		contactLists: state
	};
};

export default connect(mapStateToProps)(CreateNewContactDetails);