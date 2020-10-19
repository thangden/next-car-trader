import { GetServerSideProps } from "next";
import Link from "next/link";

export interface TeamProps {
	names: string[];
}

export default function Team({ names }: TeamProps) {
	return (
		<div>
			<Link href="/server-side"><a>Server site</a></Link>
			{names.map(name => <h2 key={name}>{name}</h2>)}
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<TeamProps> = async ctx => {
	return { props: { names: ['Thangden', 'Bruno', 'Bo'] } }
}