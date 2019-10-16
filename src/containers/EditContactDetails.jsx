import React, {Component} from 'react';
import { connect } from 'react-redux';
import ContactForm from './ContactForm.jsx';
import styled from 'styled-components';
import { updateContactDetails } from "../actions/actions.js"

const CreateNewContactDetailsContainer = styled.div`
	border: 1px solid #000;
	border-radius: 5px;
	margin-top: 30px;
	padding: 10px;
`;

const EditContactDetails = (props) => {
	return (
		<CreateNewContactDetailsContainer>
			<ContactForm
				contact={props.contact}
				onSubmit={(contact) => {
					let index = props.contactList.findIndex(c => c.id === contact.id);
					props.contactList[index]=contact;
					props.dispatch(updateContactDetails(props.contactList));
					props.history.push('/');
				}}
			/>
		</CreateNewContactDetailsContainer>
	);
}

const mapStateToProps = (state, props) => {
	return {
		contact: state.find((contact) => contact.id === props.match.params.id),
		contactList: state
	};
};

export default connect(mapStateToProps)(EditContactDetails);