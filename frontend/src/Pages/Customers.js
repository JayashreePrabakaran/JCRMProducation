import React, { useState, useEffect } from "react";
import SidebarMenu from '../Components/SidebarMenu'
import { getCustomers } from "./../Utils/api";

const Customers = (props) => {

	const [customers, setCustomers] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getAllCustomers();
	}, [])


	const getAllCustomers = async () => {
		setLoading(true);
		const response = await getCustomers();
		if (response) {
			setCustomers(response);
		} else {
			console.log("err", response);
		}
		setLoading(false);
	}
	return (
		<React.Fragment>
			<div className="container-fluid">
				<div className="row">
					<SidebarMenu name="customer" />

					<div className="content-sec">

						<div className="col-12 px-5 mt-5">
							<h5 className="my-3"><i className="fa fa-users me-2"></i> Customers</h5>
							{
								loading ?
									<>loading</>
									:
									<>
										{
											customers.length ?
												<table className="table table-bordered">
													<thead>
														<tr>
															<th scope="col">#</th>
															<th scope="col">Customer Name</th>
															<th scope="col">Business Name</th>
															<th scope="col">Address</th>
															<th scope="col">Phone</th>
															<th scope="col">Email</th>
														</tr>
													</thead>
													<tbody>
														{
															customers.map((customer, i) => {
																return (
																	<tr key={i}>
																		<th scope="row">{i + 1}</th>
																		<td>{customer.Name}</td>
																		<td>{customer.BusinessName}</td>
																		<td>{customer.Address}</td>
																		<td>{customer.Phone}</td>
																		<td>{customer.Email}</td>
																	</tr>
																)
															})
														}

													</tbody>
												</table> : <>No Customers Found</>
										}
									</>
							}
						</div>

					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default Customers;