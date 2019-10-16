import React, {COmponent} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const CreateNewContactDetailsContainer = styled.div`
	border: 1px solid #000;
	border-radius: 5px;
	margin-top: 30px;
	padding: 10px;
`;

const ShowContactEmails = (props) => {
	return(
		<CreateNewContactDetailsContainer>
			HelloShowContactEmails
		</CreateNewContactDetailsContainer>
	)
}

const mapStateToProps = (state) => {
	return {
		contact: state.find((contact) => contact.id === props.match.params.id),
	};
};

export default connect(mapStateToProps)(ShowContactEmails);