import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ContactListContainer = styled.div`
	border: 1px solid #000;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    flex-direction: column;
	width: 300px;
`;

const ContactListItem = ({ name, emails, phoneNumber }) => {
	return (
		<ContactListContainer>
			<div>
				<span>{name.firstName} {name.lastName}</span>
				<div>
					<span>{emails[0].value}</span>
					<span>{emails.length > 1 ? "  (" + (emails.length - 1) + "more)" : ""} </span>
				</div>
				<div>
					<span>{phoneNumber[0].countryCode + " " + phoneNumber[0].number}</span>
					<span>{phoneNumber.length > 1 ? "  (" + (phoneNumber.length - 1) + "more)" : ""} </span>
				</div>
			</div>
			<div>

			</div>
		</ContactListContainer>
	);
}

export default ContactListItem;
