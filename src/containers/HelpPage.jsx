import React from 'react';
import styled from 'styled-components';

const HelpContainer = styled.div`
	border: 1px solid #000;
	border-radius: 5px;
	margin-top: 30px;
	padding: 10px;
	display: flex;
	flex-direction: column;
`;

const HelpPage = () => (
	<HelpContainer>
		<span> 1. Unzip the zip.</span>
		<span> 2. Do npm install (Make sure you have nodeVersion > 8.9 installed in your system)</span>
		<span> 3. Command to run application : npm run dev-server </span>
		<span> 4. Technologies Used : React, Redux </span>
		<span> 5. State of application is managed within the Store </span>
	</HelpContainer>
);

export default HelpPage;
