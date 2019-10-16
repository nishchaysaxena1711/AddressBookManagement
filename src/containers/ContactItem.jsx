import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaRegEye } from 'react-icons/fa';
import { FiAtSign, FiPhone } from "react-icons/fi";

const ContactListContainer = styled.div`
	border: 1px solid #000;
    border-radius: 5px;
    padding: 5px;
    display: flex;
	width: 400px;
	margin-bottom: 15px;
`;

const IconContainer = styled.div`
    align-items: flex-end;
    display: flex;
	margin-left:auto; 
	margin-right:0;

	.icon {
		margin: 0 5px 0 5px;
		border: 1px solid #000;
		padding: 6px 5px 2px;
		border-radius: 5px;
	}
`;

const ContactListItem = ({ name, emails, phoneNumber }) => {
	let noOfPhone = 0;
	phoneNumber.find(phone => {
		if(phone.enabled) {
			noOfPhone++;
		}
	})
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
					<span>{noOfPhone > 1 ? "  (" + (noOfPhone.length - 1) + "more)" : ""} </span>
				</div>
			</div>
			<IconContainer>
				<div className="icon"><FaRegEye /></div>
				{
					emails.length > 1 &&
					<div className="icon">
						<FiAtSign />
					</div>
				}
				{
					noOfPhone > 1 &&
					<div className="icon">
						<FiPhone />
					</div>
				}
			</IconContainer>
		</ContactListContainer>
	);
}

export default ContactListItem;
