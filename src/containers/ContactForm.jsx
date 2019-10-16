import React, {Component} from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import uuid from 'uuid';

const ContactFormContainer = styled.div`
	form {
		div {
			margin-bottom: 5px;

			#firstName,
			#lastName,
			#dob {
				padding: 5px;
				width: 200px;
				background-image: none!important;
			}

			.email {
				padding: 5px;
				width: 200px;
				margin: 5px 0;
			}

			.react-calendar {
				margin-top: 5px;
				border-radius: 5px;
			}

			.phoneNumber {
				width: 150px;
				padding: 5px;
				height: 27px;
				margin-right: 10px;
			}

			.phoneNumberCountryCode {
				width: 50px;
				padding: 5px;
				height: 27px;
				margin-right: 10px;
			}

			#phoneNUmbers {
				display: flex;
			}

			.Dropdown-root {
				margin-right: 15px;
			}
		}

		.submitButton {
			padding: 10px;
			margin-left: 70px;
			border: 1px solid #000;
		}
	}
`;

const ErrorPanel = styled .div`
	border: 1px solid red;
	color: red;
	padding: 5px;
`;

class ContactForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: {
				firstName: "",
				lastName: ""
			},
			emails: [],
			phoneNumbers: [
				{
					enabled: true,
					type: 'Home',
					countryCode: "",
					number: ""
				},{
					enabled: false,
					type: 'Work',
					countryCode: "",
					numer: ""
				},{
					enabled: false,
					type: 'Personal',
					countryCode: "",
					number: ""
				}
			],
			dob: new Date(),
			error: false,
			id: ""
		}
	}

	onNameChange = (e) => {
		this.setState({
			name: {
				firstName: e.target.id === "firstName" ? e.target.value : this.state.name.firstName,
				lastName: e.target.id === "lastName" ? e.target.value : this.state.name.lastName
			}
		});
	};

	onEmailChange = (e) => {
		let {emails} = this.state;
		const index = emails.findIndex(email => email.id === e.target.id);
		if(index === -1) {
			const obj = {
				id: e.target.id,
				value: e.target.value
			};
			emails.push(obj);
		} else {
			emails[index].value = e.target.value;
		}
		this.setState({ emails });
	}

	getEmailBox = (email, id, placeholderText) => {
		return (
			<div>
				<span>Email : </span>
				<input
					className="email"
					key={"email"+ id}
					id={"email"+ id}
					type="text"
					value={email}
					placeholder={placeholderText}
					onChange={this.onEmailChange}
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
			{
				this.getEmailBox("", emails.length, "Enter another email")
			}
			</div>
		)
	}

	onDateChange = date => this.setState({ dob: date })

	onDropdownChange = (e) => {
		let {phoneNumbers} = this.state;
		let newObjectIndex = phoneNumbers.findIndex(phone => phone.type === e.value);
		phoneNumbers[newObjectIndex].enabled=true;
		let oldObjectindex = phoneNumbers.findIndex(phone => phone.enabled === true);
		phoneNumbers[oldObjectindex].enabled=false;
		phoneNumbers[newObjectIndex].countryCode=phoneNumbers[oldObjectindex].countryCode;
		phoneNumbers[newObjectIndex].number=phoneNumbers[oldObjectindex].number;
		this.setState({
			phoneNumbers
		});
	}

	onCountryCodeChange = (e) => {
		let {phoneNumbers} = this.state;
		const index = phoneNumbers.findIndex(phone => phone.type === e.target.id);
		phoneNumbers[index].countryCode=e.target.value;
		this.setState({
			phoneNumbers
		});
	}

	onPhoneNumberChange = (e) => {
		if(/^\d*\.?\d*$/.test(e.target.value)) {
			let {phoneNumbers} = this.state;
			const index = phoneNumbers.findIndex(phone => phone.type === e.target.id);
			phoneNumbers[index].number=e.target.value;
			this.setState({
				phoneNumbers
			});	
		}
	}

	getPhoneNumbers = () => {
		const {phoneNumbers} = this.state;
		const phoneNumberDropdownOptions = [];
		phoneNumbers.forEach(phone => {
			if(!phone.enabled) {
				phoneNumberDropdownOptions.push(phone.type);
			}
		});
		let phoneObject = phoneNumbers.find(phone => phone.enabled === true)
		return (
			<div id="phoneNUmbers">
				<Dropdown
					options={phoneNumberDropdownOptions}
					onChange={this.onDropdownChange} 
					value={phoneObject.type}
				/>
				<input
					className="phoneNumberCountryCode"
					id={phoneObject.type}
					type="text"
					maxLength="3"
					value={name.firstName}
					onChange={this.onCountryCodeChange}
				/>
				<input
					className="phoneNumber"
					id={phoneObject.type}
					type="text"
					maxLength="10"
					placeholder={"Enter your phone number"}
					value={name.firstName}
					onChange={this.onPhoneNumberChange}
				/>
			</div>
		)
	}

	onSubmit = (e) => {
		e.preventDefault();

		const {name, emails, phoneNumbers, dob} = this.state;
		let error = false, validNumber=true;
		phoneNumbers.forEach(phone => {
			if(phone.enabled) {
				error=true;
				if(isNaN(phone.number) || phone.number.length !== 10) {
					validNumber = false;
				} else if(phone.countryCode.length < 3) {
					validNumber = false;
				}
			}
		});
		if((!validNumber && error) || !error) {
			this.setState({
				error: true,
				errorMessage: "Enter atleast one valid phone number"
			});
		} else if(emails.length < 1) {
			this.setState({
				error: true,
				errorMessage: "Enter atleast one email"
			});		
		} else if(name.firstName.length === 0) {
			this.setState({
				error: true,
				errorMessage: "FirstName cannot be empty"
			});
		} else if(name.lastName.length === 0) {
			this.setState({
				error: true,
				errorMessage: "LastName cannot be empty"
			});
		} else {
			this.setState(() => ({ error: '', errorMessage: '' }));
			this.props.onSubmit({
				name: name,
				emails: emails,
				phoneNumber: phoneNumbers,
				dob: dob,
				id: uuid()
			});
		}
	}

	render() {
		let {name, emails, phoneNumbers, dob, error, errorMessage} = this.state;
		const phoneNumberDropdownOptions = ["Home", "Office", "Personal"];
		return (
			<ContactFormContainer>
				{
					error &&
					<ErrorPanel>{errorMessage}</ErrorPanel>
				}
				<form onSubmit={this.onSubmit}>
					<div>
						<span>Enter First Name : </span>
						<input
							id="firstName"
							type="text"
							placeholder="Enter your first name"
							maxLength="25"
							required
							value={name.firstName}
							onChange={this.onNameChange}
						/>
					</div>
					<div>
						<span>Enter Last Name : </span>
						<input
							id="lastName"
							type="text"
							placeholder="Enter your last name"
							maxLength="25"
							required
							value={name.lastName}
							onChange={this.onNameChange}
						/>
					</div>
					<div>
						<span>Select your date of birth from calender : </span>
						<input
							id="dob"
							type="text"
							disabled
							value={(dob.getMonth() + 1) + "-" + dob.getDate() + "-" + dob.getFullYear() + " (mm-dd-yyyy) " }
						/>
						<Calendar
							onChange={this.onDateChange}
							value={dob}
						/>
					</div>
					<div>
						Enter your email :
						{
							emails.length === 0
							? this.getEmailBox("", 0)
							: this.getEmails(emails)
						}
					</div>
					<div>
						Enter your phone numbers : 
						{
							this.getPhoneNumbers() 
						}
					</div>
					<button className="submitButton">
						Create Account
					</button>
				</form>
			</ContactFormContainer>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		contactLists: state
	};
};

export default connect(mapStateToProps)(ContactForm);