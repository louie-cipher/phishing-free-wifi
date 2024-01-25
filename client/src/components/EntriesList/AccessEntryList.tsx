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
	accessCount: number;
	device: string;
	os: string;
	browser: string;
};

interface AccessEntriesListProps {
	entriesList: accessEntryType[];
	toggleAccess: (id: number) => void;
}

export const AccessEntriesList = ({
	entriesList,
	toggleAccess,
}: AccessEntriesListProps) => {
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
				{index === 3 || index === 4 ? `${DateToString(value)}` : `${value}`}
				{index === 2 && (
					<ToggleButton onClick={() => toggleAccess(entry.id)}>
						{entry.internetAccess ? 'Ativo' : 'Inativo'}
					</ToggleButton>
				)}
			</TableCell>
		))}
	</>
);

const DateToString = (date: any) =>
	new Date(date).toLocaleDateString('pt-BR', {
		timeZone: 'America/Sao_Paulo',
		day: '2-digit',
		month: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	});
