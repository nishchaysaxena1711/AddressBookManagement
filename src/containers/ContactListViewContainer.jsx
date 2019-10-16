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

const FilterPanel = styled.div`
	display: flex;

	#sort {
		padding: 5px 10px;
		margin-left: 10px;
		border-radius: 3px;
	}
`;

class ContactListViewContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			searchTextArray: [],
			sortKey: "",
			sortArray: []
		};
		this.onKeyPress = this.onKeyPress.bind(this);
		this.handleSort = this.handleSort.bind(this);
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

	handleSort = () => {
		const {sortKey, searchTextArray} = this.state;
		const {contactLists} = this.props;
		this.setState({
			sortKey: sortKey === "" ? "ASC" : sortKey === "ASC" ? "DSC" : "ASC"
		});

		let sortObject;
		if(searchTextArray.length === 0) {
			sortObject = contactLists;
		} else {
			sortObject = searchTextArray;
		}

		sortObject.sort(function(a, b){
			let nameA = a.name.firstName.toLowerCase() + a.name.lastName.toLowerCase();
			let nameB = b.name.firstName.toLowerCase() + b.name.lastName.toLowerCase();
			if(sortKey === "ASC") {
				if (nameA < nameB)
					return -1; 
				if (nameA > nameB)
					return 1;
			} else if(sortKey === "DSC") {
				if (nameA > nameB)
					return -1; 
				if (nameA < nameB)
					return 1;
			}
			return 0;
		});

		this.setState({
			sortArray: sortObject
		});
	}

	getFilters = () => {
		return (
			<FilterPanel>
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
				<div>
					{
						(this.state.searchTextArray.length > 1 || this.props.contactLists.length > 1 )
						&&
						 <button
							id="sort"
							onClick={this.handleSort}
						> 
							Sort 
						</button>
					}
				</div>
			</FilterPanel>
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