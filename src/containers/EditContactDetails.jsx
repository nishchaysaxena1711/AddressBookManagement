import React, {Component} from 'react';
import { connect } from 'react-redux';

const EditContactDetails = () => {
	return (
		<div>
			EditViewContainer
		</div>
	);
}

const mapStateToProps = (state, props) => {
	return {
		expense: state.contactLists.find((contact) => contact.id === props.match.params.id)
	};
};

export default connect(mapStateToProps)(EditContactDetails);