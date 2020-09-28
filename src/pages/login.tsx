import { SubmitHandler, useForm } from 'react-hook-form';
import fetch from 'isomorphic-unfetch';

type FormValues = {
	email: string;
	password: string;
};

export default function Login() {
	const { handleSubmit, register, errors } = useForm<FormValues>();
	const onSubmit: SubmitHandler<FormValues> = async (values) => {
		const resp = await fetch('http://localhost:3000/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		});

		const json = await resp.json();
		console.log('Login -> json', json);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				type="email"
				name="email"
				ref={register({
					required: 'Required',
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						message: 'invalid email address',
					},
				})}
			/>
			{errors.email && errors.email.message}
			<input
				type="password"
				name="password"
				ref={register({
					required: 'Required',
				})}
			/>
			{errors.password && errors.password.message}

			<button type="submit">Submit</button>
		</form>
	);
}
