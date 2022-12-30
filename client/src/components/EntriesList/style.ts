import styled from 'styled-components';

export const ListContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background: #f5f6f7;
`;

export const Table = styled.table`
	border-collapse: collapse;
	width: 100%;
	margin: 12px 0;
`;

export const TableHead = styled.thead`
	background: #1877f2;
	color: white;
	padding: 12px;
	text-align: left;
	border-bottom: 1px solid #d8dbdf;
`;

export const TableHeadCell = styled.th`
	padding: 12px;
	text-align: left;
`;

export const TableBody = styled.tbody`
	background: white;
	color: #4f5d75;
	padding: 12px;
	text-align: left;
	border-bottom: 1px solid #d8dbdf;
`;

export const TableRow = styled.tr`
	padding: 12px;
	text-align: left;
	border-bottom: 1px solid #d8dbdf;
`;

export const TableCell = styled.td`
	padding: 12px;
	text-align: left;
`;

export const DeleteButton = styled.button`
	background: #e74c3c;
	color: white;
	padding: 8px 12px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	margin: 0 4px;
`;
