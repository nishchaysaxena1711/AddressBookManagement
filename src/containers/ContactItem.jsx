import React, {Component} from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FaRegEye } from 'react-icons/fa';
import { FiAtSign, FiPhone, FiXCircle } from "react-icons/fi";
import { deleteContactDetails } from '../actions/actions.js';
import ShowContactDetails from "./ShowContactEmails.jsx";
import { Link } from 'react-router-dom';

const ContactListContainer = styled.div`
	border: 1px solid #000;
    border-radius: 5px;
    padding: 5px;
    display: flex;
	width: 400px;
	margin-bottom: 15px;
	height: 70px;
`;

const IconContainer = styled.div`
    align-items: flex-end;
	flex-direction: column;
    display: flex;
	margin-left:auto; 
	margin-right:0;

	.icon {
		margin: 0 5px 0 5px;
		border: 1px solid #000;
		padding: 6px 5px 2px;
		border-radius: 5px;
	}

	.upper_icon {
		margin-bottom: 5px;
	}

	.lower_icon {
		display: flex;
	}
`;

class ContactListItem extends Component {
	constructor(props) {
		super(props);
		this.state={
			contactLists: props.contactLists | []
		};
		this.handleDeleteIcon = this.handleDeleteIcon.bind(this);
		this.showContactDetails = this.showContactDetails.bind(this);
		
	}

	handleDeleteIcon = (e) => {
		let {contactLists} = this.props;
		this.props.dispatch(deleteContactDetails({
			id: e.currentTarget.id
		}));
	}

	showContactDetails = (e) => {
		return(
			<div>
				<ShowContactDetails
					id={e.currentTarget.id}
				/>
			</div>
		);
	}

	render() {
		let noOfPhone = 0;
		const {name, emails, phoneNumber, id} = this.props;
		phoneNumber.find(phone => {
			if(phone.enabled) {
				noOfPhone++;
			}
		});
		return (
			<ContactListContainer>
				<div 
					key={id}
				>
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
					<div className="upper_icon icon">
						<a
							id={id}
							onClick={this.handleDeleteIcon}
						>
							<FiXCircle/>
						</a>
					</div>
					<div className="lower_icon">
						<div className="icon">
							<Link to={`/edit/${id}`}>
								<FaRegEye />
							</Link>
						</div>
						{
							emails.length > 1 &&
							<div className="icon">
								<Link to={`/show/${id}`}
								>
									<FiAtSign />
								</Link>
							</div>
						}
						{
							noOfPhone > 1 &&
							<div className="icon">
								<a
									id={id}
								>
									<FiPhone />
								</a>
							</div>
						}
					</div>
				</IconContainer>
			</ContactListContainer>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		contactLists: state
	};
};

export default connect(mapStateToProps)(ContactListItem);
