import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Product } from '../../model/Product';
import { openDB } from '../openDB';

export interface ServerSiteProps {
	products: Product[];
}

export default function ServerSite({ products }: ServerSiteProps) {
	return (
		<div>
			<Link href="/team"><a>Team</a></Link>
			<pre>{JSON.stringify(products, null, 2)}</pre>
		</div>
	)

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const db = await openDB();
	const products = await db.all<Product[]>('select * from product');

	await new Promise(acc => {
		setTimeout(acc, 2500)
	})

	return { props: { products } };
};
