import { useState } from 'react';
import { Input, Button, Container } from './style';

interface PasswordInputProps {
	placeholder: string;
	value: string;
	maxLength?: number | 64;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent) => void;
}

export default ({ placeholder, value, maxLength, onChange, onKeyDown }: PasswordInputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Container>
			<Input
				type={showPassword ? 'text' : 'password'}
				placeholder={placeholder}
				maxLength={maxLength}
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>

			{value !== '' && (
				<Button onClick={() => setShowPassword(!showPassword)}>
					<img
						src={showPassword ? 'eye-hide.png' : 'eye-show.png'}
						alt={showPassword ? 'Ocultar' : 'Mostrar'}
						width={20}
					/>
				</Button>
			)}
		</Container>
	);
};
