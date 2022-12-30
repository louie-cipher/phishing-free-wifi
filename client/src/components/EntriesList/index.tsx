import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeadCell,
	TableRow,
	DeleteButton,
} from './style';

export type loginEntryType = {
	id: number;
	username: string;
	password: string;
	ip: string;
	date: Date;
	device: string;
	os: string;
	browser: string;
};

export type accessEntryType = {
	id: number;
	ip: string;
	firstAccess: Date;
	lastAccess: Date;
	count: number;
	device: string;
	os: string;
	browser: string;
};

interface EntriesListProps {
	entriesList: loginEntryType[] | accessEntryType[];
	deleteEntry: (id: number) => void;
}

export const EntriesList = ({ entriesList, deleteEntry }: EntriesListProps) => {
	return (
		<Table>
			<TableHead>
				{Object.keys(entriesList[0]).map((key, index) => (
					<TableHeadCell key={index}>{key}</TableHeadCell>
				))}
			</TableHead>

			<TableBody>
				{entriesList.map((entry) => (
					<TableRow key={entry.id}>
						{Object.values(entry).map((value, index) => (
							<TableCell key={index}>
								{value instanceof Date ? DateToString(value) : value}
							</TableCell>
						))}
						<TableCell>
							<DeleteButton onClick={() => deleteEntry(entry.id)}>
								Excluir
							</DeleteButton>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

const d = (num: number) => (num < 10 ? `0${num}` : `${num}`);

const DateToString = (date: Date) =>
	`${d(date.getDate())}/${d(date.getMonth() + 1)}/${date.getFullYear()}` +
	`${d(date.getHours())}:${d(date.getMinutes())}:${d(date.getSeconds())}`;
