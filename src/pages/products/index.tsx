import { GetStaticProps } from 'next';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Product } from '../../../model/Product';
import { openDB } from '../../openDB';

export interface IndexProps {
	products: Product[];
}

export default function Index({ products }: IndexProps) {
	return (
		<Grid container spacing={3}>
			{products.map((product) => (
				<Grid key={product.id} container item xs={12} sm={3}>
					<Link href="/product/[id]" as={`/product/${product.id}`}>
						<a>
							<Card>
								<CardActionArea>
									<CardMedia
										component="img"
										height="200"
										image={product.imageUrl}
										alt={`${product.brand} ${product.model}`}
										title={`${product.brand} ${product.model}`}
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2">
											{`${product.brand} ${product.model}`}
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
										>
											{product.price}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</a>
					</Link>
				</Grid>
			))}
		</Grid>
	);
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	const currentPage = ctx.params?.currentPage as string;
	const currentPageNumber = +(currentPage || 0);

	const min = currentPageNumber * 5;
	const max = (currentPageNumber + 1) * 5;

	const db = await openDB();
	const products = await db.all(
		'select * from product where id > ? and id <= ?',
		min,
		max
	);
	return { props: { products } };
};
