import React, {Component} from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import PhoneInput from 'react-phone-number-input'

class ContactForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: {
				firstName: "",
				lastName: ""
			},
			emails: [],
			phoneNumber: {
				home: {
					enable: false,
					value: "",
				},
				office: {
					enable: false,
					value: "",
				},
				personal: {
					enable: false,
					value: ""
				}
			},
			dob: new Date()
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
		emails.push(e.target.value)
		this.setState({ emails });
	}

	getEmailBox = (email, id, placeholderText) => {
		return (
			<div>
				Email :
				<input
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
					return this.getEmailBox(email, i+1)
				})
			}
			{
				this.getEmailBox("", emails.length, "Enter another email")
			}
			</div>
		)
	}

	onDateChange = date => this.setState({ dob: date })

	// getPhoneNumbers = () => {
	// 	const {phoneNumber} = this.state;
	// 	const value = phoneNumber[phoneType].value;
	// 	return (
	// 		<Dropdown 
	// 			options={phoneNumberDropdownOptions}
	// 			onChange={(e) => {
	// 				this.setState({
	// 					phoneNumber: {
	// 						[e.value]:{
	// 							enabled: true
	// 						}
	// 					}
	// 				})
	// 			}} 
	// 			value={phoneNumberDropdownOptions[1]} 
	// 			placeholder="Select an option" 
	// 		/>
	// 		<input
	// 			id={phoneType}
	// 			type="text"
	// 			value={value}
	// 			onChange={(e) => {
	// 				this.setState({
	// 					phoneNumber: {
	// 						home: phoneType === "Home" ? e.target.value : phoneNumber.home.value,
	// 						office: phoneType === "Office" ? e.target.value : phoneNumber.office.value,
	// 						personal : phoneType === "Personal" ? e.target.value : phoneNumber.personal.value,
	// 					}
	// 				});
	// 			}}   
	// 		/>
			
	// 	)
	// }

	getPhoneNumbes = () => {
		
	}

	onFormSubmit = (e) => {
		const {name, emails, phoneNumber, dob} = this.state;
		let error = false;
		if(name.firstName.length === 0 || name.lastName.length === 0) {
			error = true;
			alert("FirstName and LastName cannot be empty.");
		}
	}

	render() {
		let {name, emails, phoneNumber, dob} = this.state;
		const phoneNumberDropdownOptions = ["Home", "Office", "Personal"];
		return (
			<div>
				<h1>ContactFormContainer</h1>
				<form onSubmit={this.onFormSubmit}>
					<div>
						<span>First Name : </span>
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
						<span>Last Name : </span>
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
						Select your DOB from below calender:
						<input
							id="dob"
							type="text"
							disabled
							value={(dob.getMonth() + 1) + "-" + dob.getDate() + "-" + dob.getFullYear() }
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
					<button>
						Create Account
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		expense: state.contactLists.find((contact) => contact.id === props.match.params.id)
	};
};

export default connect(mapStateToProps)(ContactForm);