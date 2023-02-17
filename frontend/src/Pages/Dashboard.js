import React, { useState, useEffect } from "react";
import moment from 'moment-timezone';
import SidebarMenu from '../Components/SidebarMenu';
import { getConfigurations, getCustomers, getDashboard as getDashboardData } from "./../Utils/api";

const Dashboard = (props) => {


	const [statuses, setStatuses] = useState([]);
	const [users, setUsers] = useState([]);

	const [customers, setCustomers] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getDashboard();
	}, [])

	const getDashboard = async () => {
		setLoading(true);
		try {
			const dashboard = await getDashboardData();
		} catch (error) {
			console.log("err", error);
		}
		try {
			const users = await getConfigurations();
			setUsers(users);
		} catch (error) {
			console.log("err", error);
		}
		const response = await getCustomers(true);
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
					<SidebarMenu name="dashboard" />
					<div className="content-sec">
						<div className="col-12 p-a-0 top-header d-none">
							<div className="col-12 text-right new-btn">
								<a href="" className="cs-btn" data-toggle="modal" data-target="#createNew" data-ta><i className="icon-plus-sign"></i> Create New</a>
							</div>
						</div>

						<div className="row text-center p-5">
							<div className="col-12 col-md-4">
								<h5 className="my-3"><i className="fa fa-send-o me-2"></i> Events Today</h5>
								<div className="card border">
									<h1 className="py-5 font-size-64 text-success">20</h1>
								</div>
							</div>
							<div className="col-12 col-md-4">
								<h5 className="my-3"><i className="fa fa-clock-o me-2"></i> Pending</h5>
								<div className="card border">
									<h1 className="py-5 font-size-64 text-warning">5</h1>
								</div>
							</div>
							<div className="col-12 col-md-4">
								<h5 className="my-3"><i className="fa fa-users me-2"></i> Customers</h5>
								<div className="card border" style={{ height: "265px" }}>
									<h1 className="py-5 font-size-64 text-warning">5</h1>
								</div>
							</div>
						</div>

						<div className="col-12 px-5">
							<h5 className="my-3"><i className="fa fa-users me-2"></i> Recent Customers</h5>
							{
								loading ?
									<>Loading</>
									:
									<>
										{
											customers.length ?
												<table className="table table-bordered">
													<thead>
														<tr>
															<th scope="col">#</th>
															<th scope="col">Customer Name</th>
															<th scope="col">Address</th>
															<th scope="col">Phone</th>
															<th scope="col">Email</th>
															<th scope="col">Assign To</th>
															<th scope="col">Date</th>
															<th scope="col">Comments</th>
															<th scope="col">Status</th>
														</tr>
													</thead>
													<tbody>
														{
															customers.map((customer, i) => {
																return (
																	<tr key={i}>
																		<th scope="row">{i + 1}</th>
																		<td>{customer.Name}</td>
																		<td>{customer.Address}</td>
																		<td>{customer.Phone}</td>
																		<td>{customer.Email}</td>
																		<td>{customer.Assigned}</td>
																		<td>{moment(customer.Date).format('YYYY-MM-DD')}</td>
																		<td>{customer.Comments}</td>
																		<td>
																			{
																				<span className={`btn btn-sm text-white ${customer.Status}`}> <i className="fa fa-phone"></i> {customer.Status}</span>
																			}
																		</td>
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

export default Dashboard;