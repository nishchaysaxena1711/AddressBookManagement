import React, {Component} from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';

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
			dob: new Date(),
			error: false
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

	onSubmit = (e) => {
		e.preventDefault();

		const {name, emails, phoneNumber, dob} = this.state;
		let error = false;
		if(name.firstName.length === 0) {
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
				name: {
					firstName: name.firstName,
					lastName: name.lastName
				},
				emails: emails,
				phoneNumber: {
					home: phoneNumber.home.value,
					office: phoneNumber.office.value,
					personal: phoneNumber.personal.value
				},
				dob: dob,
			});
		}
	}

	render() {
		let {name, emails, phoneNumber, dob, error, errorMessage} = this.state;
		const phoneNumberDropdownOptions = ["Home", "Office", "Personal"];
		return (
			<div>
				{
					error &&
					<div>{errorMessage}</div>
				}
				<h1>ContactFormContainer</h1>
				<form onSubmit={this.onSubmit}>
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
		expense: state.find((contact) => contact.id === props.match.params.id)
	};
};

export default ContactForm;