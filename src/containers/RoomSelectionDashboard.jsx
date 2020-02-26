import React, { Component } from 'react';
import styled from 'styled-components';
import { CounterTypes } from "../constants/constants.js";
import { faPlusCircle, faMinusCircle, faBed, faUsers, faUser, faChild } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RoomSelectionContainer = styled.div`
	margin-top: 10px;
	border: 1px solid #000;
	padding: 15px;

	> div {
		margin: 10px 0;
		border: 1px solid #000;
		padding: 15px;
		display: flex;
    	justify-content: space-between;
	}

	svg {
		margin: 0 5px;
	}
`;		

class RoomSelectionDashboard extends Component {
	constructor() {
		super();
		this.state = {
			rooms: 0,
			adults: 0,
			children: 0
		};
	}

	render() {
		return(
			<RoomSelectionContainer>
				<span>
					<FontAwesomeIcon icon={faUsers} /> Choose number of <strong>people</strong>
				</span>
				<React.Fragment> 
				{
					CounterTypes.map((type) => {
						return (
							<div 
								key={type.key}
							>
								<div>
									<span>
										<FontAwesomeIcon icon={type.value === "ROOMS" ? faBed : type.value === "ADULTS" ? faUser : faChild } />
									</span>
									<span>{type.value}</span>
								</div>
								<div>
									<FontAwesomeIcon
										id={type.value}
										icon={faMinusCircle}
										onClick={(e) => {
											let element = e.target.parentElement.id.toLowerCase();
											this.setState({
												[element]: this.state[element] - 1
											});
										}}
									/>
									<span>{this.state[type.key]}</span>	
									<FontAwesomeIcon 
										icon={faPlusCircle} 
										id={type.value}
										onClick={(e) => {
											let element = e.target.parentElement.id.toLowerCase();
											this.setState({
												[element]: this.state[element] + 1
											});
										}}
									/>
								</div>
							</div>
					)})
				}
				</React.Fragment> 
			</RoomSelectionContainer>
		)
	}
}

export default RoomSelectionDashboard;