import React, {Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const CreateNewContactDetailsContainer = styled.div`
	border: 1px solid #000;
	border-radius: 5px;
	margin-top: 30px;
	padding: 10px;

	input {
		width: 250px;
		padding: 5px;
		margin: 5px 0;
	}
`;

class ShowContactEmails extends Component {
	constructor(props) {
		super(props);
	}

	getEmailBox = (email, id) => {
		return (
			<div>
				<input
					className="email"
					key={"email"+ id}
					id={"email"+ id}
					type="text"
					value={email}
					disabled
				/>
			</div>
		)
	}

	getEmails = (emails) => {
		return (
			<div>
			{
				emails.map((email, i) => {
					return this.getEmailBox(email.value, i)
				})
			}
			</div>
		)
	}

	render() {
		const {contact} = this.props;
		return(
			<CreateNewContactDetailsContainer>
				<h4>{contact.name.firstName} Email's</h4>
				<div>
				{
					this.getEmails(contact.emails)
				}
				</div>
			</CreateNewContactDetailsContainer>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		contact: state.find((contact) => contact.id === props.match.params.id),
	};
};

export default connect(mapStateToProps)(ShowContactEmails);