import React, {Component} from 'react';
import { connect } from 'react-redux';
import ContactItem from './ContactItem.jsx';
import styled from 'styled-components';

const EmptyContactContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10px 0;
`;

const ContactListContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10px 0;

	#search {
		padding: 5px;
		margin-bottom: 10px;
		width: 200px;
	}
`;

class ContactListViewContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			searchTextArray: []
		};
		this.onKeyPress =  this.onKeyPress.bind(this);
	}

	onSearchTextChange = (e) => {
		this.setState({
			searchText: e.target.value
		})
	}

	onKeyPress = (e) => {
		if(e.key === 'Enter') {
			let {contactLists} = this.props;
			const {searchText} = this.state;
			let contactListWithSearchText = [];
			contactLists.forEach(contact => {
				if(contact.name.firstName.includes(searchText) ||
					contact.name.lastName.includes(searchText)) {
						contactListWithSearchText.push(contact);
				}
			});
			this.setState({
				searchTextArray: contactListWithSearchText
			});
		}
	}

	getFilters = () => {
		return (
			<div>
				<span>Search </span>
				<input
					id="search"
					type="text"
					placeholder="Search"
					value={this.state.searchText}
					onChange={this.onSearchTextChange}
					onKeyPress={this.onKeyPress}
				/>
			</div>
		);
	}

	render() {
		const {props, state} = this;
		return (
			<ContactListContainer>
				<h1>Contact List</h1>
				<div>
					{
						props.contactLists.length !== 0
						? this.getFilters()
						: ""
					}
				</div>
				{
					props.contactLists.length !== 0
					? state.searchText === ""
						? (props.contactLists.map((contact) => {
							return <ContactItem key={contact.id} {...contact} />;
							})
						)
						: (
							state.searchTextArray.map((contact) => {
								return <ContactItem key={contact.id} {...contact} />;
							})
						)
					: <EmptyContactContainer>
						<h3>Currently, you don't have any contacts in your book.</h3>
						<h3>Press click contact link to create accounts.</h3>
					</EmptyContactContainer>
				}
			</ContactListContainer>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		contactLists: state
	};
};

export default connect(mapStateToProps)(ContactListViewContainer);