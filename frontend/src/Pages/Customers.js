import React, { useState, useEffect } from "react";
import moment from 'moment-timezone';
import SidebarMenu from '../Components/SidebarMenu'
import { getConfigurations, getCustomers } from "./../Utils/api";

const Customers = (props) => {

	const [customers, setCustomers] = useState([]);
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);

	const [name, setName] = useState("");
	const [businessName, setBusinessName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [status, setStatus] = useState("");
	const [paymentType, setPaymentType] = useState("");
	const [subscription, setSubscription] = useState("");
	const [paidAmount, setPaidAmount] = useState("");
	const [pendingAmount, setPendingAmount] = useState("");
	const [assigned, setAssigned] = useState("");
	const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
	const [fromDate, setFromDate] = useState(moment().format('YYYY-MM-DD'));
	const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'));
	const [comments, setComments] = useState("");
	const [walkin, setWalkin] = useState(false);

	useEffect(() => {
		getAllCustomers();
	}, [])


	const getAllCustomers = async () => {
		setLoading(true);
		try {
			const users = await getConfigurations();
			setUsers(users);
		} catch (error) {
			console.log("err", error);
		}
		const response = await getCustomers();
		if (response) {
			setCustomers(response);
		} else {
			console.log("err", response);
		}
		setLoading(false);
	}
	const selectLead = (lead) => {
		let { _id: Id, Name, BusinessName, Phone, Email, Comments, Address, Status, Assigned, Date, WalkIn, CreatedByUser, ModifyByUser, CreatedDate, PaymentType, Subscription, PaidAmount, PendingAmount, FromDate, ToDate } = lead;
		setName(Name);
		setBusinessName(BusinessName);
		setPhone(Phone);
		setEmail(Email);
		setComments(Comments);
		setAddress(Address);
		setStatus(Status);
		setPaymentType(PaymentType);
		setSubscription(Subscription);
		setPaidAmount(PaidAmount);
		setPendingAmount(PendingAmount);
		setFromDate(PaidAmount);
		setToDate(PaidAmount);
		setAssigned(Assigned);
		setDate(Date);
		setWalkin(WalkIn);
		setFromDate(fromDate);
		setToDate(toDate);
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
															<th scope="col">Action</th>
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
																		<td>
																			{
																				<span className={`btn btn-sm  text-white btn-primary`} data-bs-toggle="modal" data-bs-target="#newLeadModal" onClick={() => selectLead(customer)}> <i className="fa fa-phone"></i> View</span>
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
			<div className="modal fade" id="newLeadModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">{"View Lead"}</h5>
							<button type="button" id="btn-close-modal" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="row">
									<div className="col-6 mb-3">
										<label htmlFor="c_name" className="form-label">Contact Name</label>
										<input readOnly={true} value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="c_name" aria-describedby="nameHelp" />
									</div>
									<div className="col-6 mb-3">
										<label htmlFor="c_b_name" className="form-label">Business Name</label>
										<input readOnly={true} value={businessName} onChange={(e) => setBusinessName(e.target.value)} type="text" className="form-control" id="c_b_name" aria-describedby="businessNameHelp" />
									</div>
									<div className="col-6 mb-3">
										<label htmlFor="c_phone" className="form-label">Phone</label>
										<input readOnly={true} value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="form-control" id="c_phone" aria-describedby="phoneHelp" />
									</div>
									<div className="col-6 mb-3">
										<label htmlFor="c_email" className="form-label">Email address</label>
										<input readOnly={true} value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="c_email" aria-describedby="emailHelp" />
									</div>
									<div className="col-12 mb-3">
										<label htmlFor="c_address" className="form-label">Address</label>
										<textarea readOnly={true} value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="c_address" aria-describedby="addressHelp"></textarea>
									</div>
									<div className="col-4 mb-3">
										<label htmlFor="c_status" className="form-label">Status</label>
										<input readOnly={true} value={status} onChange={(e) => setStatus(e.target.value)} type="text" className="form-control" id="c_status" aria-describedby="statusHelp" />
									</div>
									<div className="col-4 mb-3">
										<label htmlFor="c_assign" className="form-label">Assign To</label>
										<input readOnly={true} value={users.find(user => user._id === assigned)?.Name} onChange={(e) => setAssigned(e.target.value)} type="text" className="form-control" id="c_assigned" aria-describedby="assignedHelp" />
									</div>
									<div className="col-4 mb-3">
										<label htmlFor="c_date" className="form-label">Date</label>
										<input readOnly={true} value={moment(date).format('YYYY-MM-DD')} onChange={(e) => setDate(e.target.value)} type="date" className="form-control" id="c_date" aria-describedby="Date" />
									</div>
									{/* <div className="col-4 mb-3">
										<label htmlFor="PaymentType" className="form-label">Payment Type</label>
										<input readOnly={true} value={paymentType} onChange={(e) => setPaymentType(e.target.value)} type="text" className="form-control" id="PaymentType" aria-describedby="PaymentType" />
									</div>
									<div className="col-4 mb-3">
										<label htmlFor="PaidAmount" className="form-label">Paid Amount</label>
										<input className="form-control" value={paidAmount} onChange={(e) => setPaidAmount(e.target.value)} id="PaidAmount" aria-describedby="PaidAmount" />
									</div>
									<div className="col-4 mb-3">
										<label htmlFor="PendingAmount" className="form-label">Pending Amount</label>
										<input className="form-control" value={pendingAmount} onChange={(e) => setPendingAmount(e.target.value)} id="PendingAmount" aria-describedby="PendingAmount" />
									</div>
									<div className="col-4 mb-3">
										<label htmlFor="Subscription" className="form-label">Subscription</label>
										<input readOnly={true} value={subscription} onChange={(e) => setSubscription(e.target.value)} type="text" className="form-control" id="Subscription" aria-describedby="Subscription" />
									</div>
									<div className="col-4 mb-3">
										<label htmlFor="FromDate" className="form-label">From Date</label>
										<input value={moment(fromDate).format('YYYY-MM-DD')} onChange={(e) => setFromDate(e.target.value)} type="date" className="form-control" id="FromDate" aria-describedby="FromDate" />
									</div>
									<div className="col-4 mb-3">
										<label htmlFor="ToDate" className="form-label">To Date</label>
										<input value={moment(toDate).format('YYYY-MM-DD')} onChange={(e) => setToDate(e.target.value)} type="date" className="form-control" id="ToDate" aria-describedby="ToDate" />
									</div> */}
									<div className="col-12 mb-3">
										<label htmlFor="c_comments" className="form-label">Comments</label>
										<textarea readOnly={true} value={comments} className="form-control" onChange={(e) => setComments(e.target.value)} id="c_comments" aria-describedby="addressHelp"></textarea>
									</div>

								</div>
							</form>
						</div>
						<div className="modal-footer">
							<div className="col-12 px-3">
								<div className="row">
									<div className="col-6 align-self-center">
										<label className="m-0"><input defaultChecked={walkin} onChange={(e) => setWalkin(e.target.checked)} type="checkbox" name="walkin" /> <span>Walkin</span> </label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default Customers;