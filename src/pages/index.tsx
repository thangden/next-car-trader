import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Product } from '../../model/Product';
import { openDB } from '../openDB';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export interface IndexProps {
	products: Product[];
}

export default function Index({ products }: IndexProps) {
	return (
		<Grid container spacing={3}>
			{products.map((product) => (
				<Grid key={product.id} container item xs={12} sm={6} spacing={3}>
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
	const db = await openDB();
	const products = await db.all('select * from product');
	return { props: { products } };
};

// export default function Home() {
// 	return (
// 		<div className={styles.container}>
// 			<Head>
// 				<title>Create Next App</title>
// 				<link rel="icon" href="/favicon.ico" />
// 			</Head>

// 			<main className={styles.main}>
// 				<h1 className={styles.title}>
// 					Welcome to <a href="https://nextjs.org">Next.js!</a>
// 				</h1>

// 				<p className={styles.description}>
// 					Get started by editing{' '}
// 					<code className={styles.code}>pages/index.js</code>
// 				</p>

// 				<div className={styles.grid}>
// 					<a href="https://nextjs.org/docs" className={styles.card}>
// 						<h3>Documentation &rarr;</h3>
// 						<p>Find in-depth information about Next.js features and API.</p>
// 					</a>

// 					<a href="https://nextjs.org/learn" className={styles.card}>
// 						<h3>Learn &rarr;</h3>
// 						<p>Learn about Next.js in an interactive course with quizzes!</p>
// 					</a>

// 					<a
// 						href="https://github.com/vercel/next.js/tree/master/examples"
// 						className={styles.card}
// 					>
// 						<h3>Examples &rarr;</h3>
// 						<p>Discover and deploy boilerplate example Next.js projects.</p>
// 					</a>

// 					<a
// 						href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
// 						className={styles.card}
// 					>
// 						<h3>Deploy &rarr;</h3>
// 						<p>
// 							Instantly deploy your Next.js site to a public URL with Vercel.
// 						</p>
// 					</a>
// 				</div>
// 			</main>

// 			<footer className={styles.footer}>
// 				<a
// 					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
// 					target="_blank"
// 					rel="noopener noreferrer"
// 				>
// 					Powered by{' '}
// 					<img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
// 				</a>
// 			</footer>
// 		</div>
// 	);
// }
