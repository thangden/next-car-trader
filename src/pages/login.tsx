import { SubmitHandler, useForm } from 'react-hook-form';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

type FormValues = {
	email: string;
	password: string;
};

export default function Login() {
	const router = useRouter();
	const [message, setMessage] = useState(null);
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

		if (json?.message) {
			setMessage(json.message);
		}

		if (json?.id) {
			router.push('/');
		}
	};

	return (
		<div>
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
			{
				message && <small>{message}</small>
			}
			<div>
				<Link href="/signup">
					<a>Signup</a>
				</Link>
			</div>
		</div>
	);
}
