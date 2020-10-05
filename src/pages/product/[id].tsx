import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Product } from '../../../model/Product';
import { openDB } from '../../openDB';

export type ProductDetailProps = Product;

export default function ProductDetail({
	id,
	brand,
	model,
	price,
	imageUrl,
}: ProductDetailProps) {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<div>{id}</div>
			<div>{brand}</div>
			<div>{model}</div>
			<div>{price}</div>
			<div>{imageUrl}</div>
		</div>
	);
}

export const getStaticProps: GetStaticProps<ProductDetailProps> = async (
	ctx
) => {
	const id = ctx.params?.id as string;
	const db = await openDB();
	const product = await db.get('select * from product where id = ?', +id);

	return { props: product };
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
	const db = await openDB();
	const products = await db.all('select * from product');
	const paths = products.map((p) => {
		return {
			params: { id: p.id.toString() },
		};
	});

	return {
		fallback: true,
		paths,
	};
};
