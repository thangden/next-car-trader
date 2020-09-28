import Link from 'next/link';
import { VehiclePerson } from '../../api/VehiclePerson';

export interface ListProps {
	ownersList?: VehiclePerson[];
}

export default function List({ ownersList }: ListProps) {
	return (
		<div>
			{ownersList?.map((o, index) => (
				<div key={index}>
					<Link as={`/${o.vehicle}/${o.ownerName}`} href="/[vehicle]/[person]">
						<a>
							Navigate to {o.ownerName}'s {o.vehicle}
						</a>
					</Link>
				</div>
			))}
		</div>
	);
}

List.getInitialProps = async () => {
	const res = await fetch(`http://localhost:4001/vehicles`);
	const ownersList: VehiclePerson[] = await res.json();

	return { ownersList };
};
