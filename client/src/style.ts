import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
	width: 100vw;
	color: white;
	font-size: calc(10px + 2vmin);
	text-align: center;
`;

export const ContentArea = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	max-width: 400px;
	width: 100%;
`;

export const Input = styled.input`
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	padding: 12px;
	background: #f5f6f7;
	color: #000000;
	outline: none;
	font-size: 14px;
	margin-bottom: 12px;
	width: 100%;

	border-color: rgba(0, 0, 0, 0.07) rgba(0, 0, 0, 0.11) rgba(0, 0, 0, 0.18);
	border-radius: 4px;
	border-style: solid;
	border-width: 1px;
`;

export const LoginButton = styled.button`
	width: 100%;
	padding: 12px;
	margin: 10px 0;
	border-radius: 4px;
	border: none;
	background-color: #1877f2;
	color: #ffffff;
	font-size: 14px;
	font-weight: bold;
	cursor: pointer;
`;

export const Line = styled.div`
	width: 400px;
	border-top: 1px solid #d8dbdf;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 12px 0;
`;

export const Footer = styled.div`
	color: #8a8d91;
	margin-top: 20px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const FooterLink = styled.div`
	color: #8a8d91;
	font-size: 12px;
	margin: 2px 0;
	padding: 0 12px;
	cursor: pointer;
`;
