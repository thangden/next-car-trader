import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { myGet } from '../../api/myGet';
import { NextPageContext } from 'next';

export default function Vehicles({ vehicles }: any) {
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell align="right">Brand</TableCell>
						<TableCell align="right">Model</TableCell>
						<TableCell align="right">OwnerId</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{vehicles?.map((row: any) => (
						<TableRow key={row.id}>
							<TableCell component="th" scope="row">
								{row.id}
							</TableCell>
							<TableCell align="right">{row.brand}</TableCell>
							<TableCell align="right">{row.model}</TableCell>
							<TableCell align="right">{row.ownerId}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

Vehicles.getInitialProps = async (ctx: NextPageContext) => {
	const vehicles = await myGet('http://localhost:3000/api/vehicles', ctx);
	console.log('Vehicles.getInitialProps -> vehicles', vehicles);

	return { vehicles };
};
