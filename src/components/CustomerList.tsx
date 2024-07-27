import React, { useEffect, useMemo, useState } from 'react';
import './CustomerList.css';

interface User {
	id: number;
	firstName: string;
	lastName: string;
	birthDate: string;
	address: {
		city: string;
	};
}

const CustomerList: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [nameFilter, setNameFilter] = useState('');
	const [cityFilter, setCityFilter] = useState('');

	useEffect(() => {
		fetch('https://dummyjson.com/users')
			.then((response) => response.json())
			.then((data) => setUsers(data.users));
	}, []);

	const cities = useMemo(() => {
		const citySet = new Set(users.map((user) => user.address.city));
		return Array.from(citySet);
	}, [users]);

	const filteredUsers = useMemo(() => {
		return users.filter((user) => {
			const nameMatch = (user.firstName + ' ' + user.lastName)
				.toLowerCase()
				.includes(nameFilter.toLowerCase());
			const cityMatch = !cityFilter || user.address.city === cityFilter;
			return nameMatch && cityMatch;
		});
	}, [users, nameFilter, cityFilter]);

	return (
		<div className="customer-list">
			<div className="filters">
				<input
					type="text"
					placeholder="Search by name"
					className="name-filter"
					onChange={(e) => setNameFilter(e.target.value)}
				/>
				<select
					onChange={(e) => setCityFilter(e.target.value)}
					className="city-filter"
				>
					<option value="">Select city</option>
					{cities.map((city) => (
						<option key={city} value={city}>
							{city}
						</option>
					))}
				</select>
				<label>
					Highlight oldest per city
					<input type="checkbox" />
				</label>
			</div>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>City</th>
						<th>Birthday</th>
					</tr>
				</thead>
				<tbody>
					{filteredUsers.map((user) => (
						<tr key={user.id}>
							<td>{`${user.firstName} ${user.lastName}`}</td>
							<td>{user.address.city}</td>
							<td>
								{new Date(user.birthDate).toLocaleDateString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CustomerList;
