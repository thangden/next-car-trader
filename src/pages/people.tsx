import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { NextPageContext } from 'next';
import { myGet } from '../../api/myGet';

export default function People({ people }: any) {
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell align="right">name</TableCell>
						<TableCell align="right">Email</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{people.map((row: any) => (
						<TableRow key={row.id}>
							<TableCell component="th" scope="row">
								{row.id}
							</TableCell>
							<TableCell align="right">{row.name}</TableCell>
							<TableCell align="right">{row.email}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

People.getInitialProps = async (ctx: NextPageContext) => {
	const people = await myGet('http://localhost:3000/api/people', ctx);
	return { people };
};
