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

interface EntriesListProps {
	entriesList: loginEntryType[];
	deleteEntry: (id: number) => void;
}

export const LoginEntriesList = ({ entriesList, deleteEntry }: EntriesListProps) => {
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
								{typeof value === 'object' ? DateToString(value) : value}
							</TableCell>
						))}
						<TableCell>
							<DeleteButton onClick={() => deleteEntry(entry.id)}>
								Deletar
							</DeleteButton>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

const d = (num: number) => (num < 10 ? `0${num}` : `${num}`);

const DateToString = (date: Date) => {
	// localTimezoneOffset = -3h
	const localDate = new Date(date.getTime() - 10800000);
	return (
		`${d(localDate.getDate())}/${d(localDate.getMonth() + 1)}/${localDate.getFullYear()}` +
		`${d(localDate.getHours())}:${d(localDate.getMinutes())}:${d(localDate.getSeconds())}`
	);
};
