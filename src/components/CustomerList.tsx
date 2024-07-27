import React from 'react';
import './CustomerList.css';

const CustomerList: React.FC = () => {
	return (
		<div className="customer-list">
			<div className="filters">
				<input
					type="text"
					placeholder="Search by name"
				/>
				<select>
					<option value="">Select city</option>
				</select>
				<label>
					Highlight oldest per city
					<input
						type="checkbox"
					/>
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
				</tbody>
			</table>
		</div>
	);
};

export default CustomerList;
