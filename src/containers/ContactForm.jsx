import React, {Component} from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                firstName: props.contact ? props.contact.firstName : "",
                lastName: props.contact ? props.contact.lastName : ""
            },
            emails: props.contact ? props.contact.emails : [],
            phoneNumber: {
                work: props.contact ? props.contact.phoneNumber.work : "",
                office: props.contact ? props.contact.phoneNumber.office : "",
                personal: props.contact ? props.contact.phoneNumber.personal : ""
            },
            dob: props.contact ? props.contact.dob : new Date()
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
        this.setState({
            emails
        });
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

	render() {
        let {name, emails, phoneNumber, dob} = this.state;
        return (
            <div>
                <h1>ContactFormContainer</h1>
                <form>
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
                    {
                        emails.length === 0
                        ? this.getEmailBox("", 0)
                        : this.getEmails(emails)
                    }
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