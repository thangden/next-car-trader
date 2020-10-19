import { SubmitHandler, useForm } from 'react-hook-form';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

type FormValues = {
	name: string;
	email: string;
	password: string;
};

export default function Signup() {
	const router = useRouter();
	const [message, setMessage] = useState(null);
	const { handleSubmit, register, errors } = useForm<FormValues>();
	const onSubmit: SubmitHandler<FormValues> = async (values) => {
		const resp = await fetch('http://localhost:3000/api/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		});

		const json = await resp.json();
		console.log('Signup -> json', json);
		if (json.message) {
			setMessage(json.message);
		}
		if (json.id) {
			router.push('/login');
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					name="name"
					ref={register({
						required: 'Required',
					})}
				/>
				{errors.name && errors.name.message}
				<input
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
			{
				message && <small>{message}</small>
			}
			<div>
				<Link href="/login">
					<a>Login</a>
				</Link>
			</div>
		</div>
	);
}
