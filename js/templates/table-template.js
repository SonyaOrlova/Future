export default (data, limitIndex, startIndex) =>
`
	<table class="data__table">
		<thead class="data__head">
			<tr>
				<th class="data-head__id" data-type="number">ID</th>
				<th class="data-head__firstName">FirstName</th>
				<th class="data-head__lastName">LastName</th>
				<th class="data-head__email">Email</th>
				<th class="data-head__phone">Phone</th>
				<th class="data-head__address">Address</th>
				<th class="data-head__description">Description</th>
			</tr>
		</thead>

		<tbody class="data__body">
			${[...data].map((it, index) => {
				if (index >= startIndex && index < limitIndex) {
				return `
				<tr class="data__item">
					<td class="data__id">${it.id}</td>
					<td class="data__firstName">${it.firstName}</td>
					<td class="data__lastName">${it.lastName}</td>
					<td class="data__email">${it.email}</td>
					<td class="data__phone">${it.phone}</td>
					<td class="data__address">${JSON.stringify(it.address).slice(1, -1)}</td>
					<td class="data__description">${it.description}</td>
				</tr>
		` };
		}).join(``)}
		</tbody>  
	</table>
`;
