import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeadCell,
	TableRow,
	ToggleButton,
} from './style';

export type accessEntryType = {
	id: number;
	ip: string;
	internetAccess: boolean;
	firstAccess: Date;
	lastAccess: Date;
	count: number;
	device: string;
	os: string;
	browser: string;
};

interface AccessEntriesListProps {
	entriesList: accessEntryType[];
	toggleAccess: (id: number) => void;
}

export const AccessEntriesList = ({ entriesList, toggleAccess }: AccessEntriesListProps) => {
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
						<TableRowMap entry={entry} toggleAccess={toggleAccess} />
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

interface TableRowMapProps {
	entry: accessEntryType;
	toggleAccess: (id: number) => void;
}
const TableRowMap = ({ entry, toggleAccess }: TableRowMapProps) => (
	<>
		{Object.values(entry).map((value, index) => (
			<TableCell key={index}>
				{value instanceof Date ? DateToString(value) : value}
				{index === 2 && (
					<ToggleButton onClick={() => toggleAccess(entry.id)}>
						{entry.internetAccess ? 'Ativo' : 'Inativo'}
					</ToggleButton>
				)}
			</TableCell>
		))}
	</>
);

const d = (num: number) => (num < 10 ? `0${num}` : `${num}`);

const DateToString = (date: Date) => {
	// localTimezoneOffset = -3h
	const localDate = new Date(date.getTime() - 10800000);
	return (
		`${d(localDate.getDate())}/${d(localDate.getMonth() + 1)}/${localDate.getFullYear()}` +
		`${d(localDate.getHours())}:${d(localDate.getMinutes())}:${d(localDate.getSeconds())}`
	);
};
