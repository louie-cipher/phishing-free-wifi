import styled from 'styled-components';

export const Container = styled.div`
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	padding: 12px;
	background: #f5f6f7;
	color: #000000;
	outline: none;
	font-size: 14px;
	margin-bottom: 12px;
	width: 100%;
	justify-content: space-between;

	border-color: rgba(0, 0, 0, 0.07) rgba(0, 0, 0, 0.11) rgba(0, 0, 0, 0.18);
	border-radius: 4px;
	border-style: solid;
	border-width: 1px;
`;

export const Input = styled.input`
	background: transparent;
	border: 0;
	margin: 0;
	outline: none;
	width: 100%;
`;

export const Button = styled.button`
	background: transparent;
	border: none;
	padding: 0;
	margin: 0;
	cursor: pointer;
`;
