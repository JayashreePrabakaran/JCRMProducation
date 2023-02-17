import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import SidebarMenu from '../Components/SidebarMenu'
import { createLead, getConfigurations, getLeads, updateLead } from "./../Utils/api";
import Configurations from "./../Utils/Configuration.json";

const Leads = (props) => {

	const [leads, setLeads] = useState([]);
	const [loading, setLoading] = useState(false);

	const [users, setUsers] = useState([]);

	const [id, setID] = useState("");

	const [name, setName] = useState("");
	const [businessName, setBusinessName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [status, setStatus] = useState("");
	const [assigned, setAssigned] = useState("");
	const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
	const [walkin, setWalkin] = useState(false);
	const [comments, setComments] = useState("");

	useEffect(() => {
		getAllLeads();
	}, [])


	const getAllLeads = async () => {
		setLoading(true);
		try {
			const users = await getConfigurations();
			setUsers(users);
		} catch (error) {
			console.log("err", error);
		}
		const response = await getLeads();
		if (response) {
			setLeads(response);
		} else {
			console.log("err", response);
		}


		setLoading(false);
	}

	const selectLead = (lead) => {
		let { _id : Id, Name, BusinessName, Phone, Email, Address, Status, Assigned, Date, Walkin } = lead;
		setID(Id);
		setName(Name);
		setBusinessName(BusinessName);
		setPhone(Phone);
		setEmail(Email);
		setAddress(Address);
		setStatus(Status);
		setAssigned(Assigned);
		setDate(Date);
		setWalkin(Walkin);
	}
	const resetValues = async (e) => {
		setID("");
		setName("");
		setBusinessName("");
		setPhone("");
		setEmail("");
		setAddress("");
		setStatus(Configurations.Status[0]);
		setAssigned("");
		setDate(moment().format('YYYY-MM-DD'));
		setWalkin(false);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		let data = {
			status: status,
			comments: comments
		}
		const response = await updateLead(id, data);
		if (response.data) {
			console.log(response);
		} else {
			console.log("err", response);
		}
	}


	return (
		<React.Fragment>
			<div className="container-fluid">
				<div className="row">
					<SidebarMenu name="lead-details" />
					<div className="content-sec">
						<div className="col-12 px-5 mt-5">
							<h5 className="my-3"><i className="fa fa-users me-2"></i> Leads</h5>
							{
								loading ?
									<>Loading</>
									:
									<>
										{
											leads.length ?
												<table className="table table-bordered">
													<thead>
														<tr>
															<th scope="col">#</th>
															<th scope="col">Contact Name</th>
															<th scope="col">Business Name</th>
															<th scope="col">Address</th>
															<th scope="col">Phone</th>
															<th scope="col">Email</th>
															<th scope="col">Assign To</th>
															<th scope="col">Schedule Date</th>
															<th scope="col">Comments</th>
															<th scope="col">Status</th>
														</tr>
													</thead>
													<tbody>
														{
															leads.map((lead, i) => {
																return (
																	<tr key={i}>
																		<th scope="row">{i + 1}</th>
																		<td>{lead.Name}</td>
																		<td>{lead.BusinessName}</td>
																		<td>{lead.Address}</td>
																		<td>{lead.Phone}</td>
																		<td>{lead.Email}</td>
																		<td>{lead.Assigned}</td>
																		<td>{moment(lead.Date).format('YYYY-MM-DD')}</td>
																		<td>{lead.Comments}</td>
																		<td>
																			{/*{*/}
																			{/*	lead.Status === 'New' ? <span className="btn btn-sm bg-success text-white" data-bs-toggle="modal" data-bs-target="#newLeadModal" onClick={() => selectLead(lead)}> <i className="fa fa-laptop"></i> New</span> : lead.Status === 'Demo' ? <span className="btn btn-sm bg-danger text-white" data-bs-toggle="modal" data-bs-target="#newLeadModal" onClick={() => selectLead(lead)}> <i className="fa fa-phone"></i> Demo</span> : <span className="btn btn-sm bg-danger text-white" data-bs-toggle="modal" data-bs-target="#newLeadModal"> <i className="fa fa-phone"></i> Recall</span>*/}
																			{/*}*/}
																			{
																				<span className={`btn btn-sm  text-white
${lead.Status}`} data-bs-toggle="modal" data-bs-target="#newLeadModal" onClick={() => selectLead(lead)}> <i className="fa fa-phone"></i> {lead.Status}</span>
																			}
																		</td>

																	</tr>
																)
															})
														}
													</tbody>
												</table> : <>No Leads Found</>
										}
									</>
							}
						</div>

					</div>
				</div>
			</div>

			{/* <!-- Modal --> */}
			<div className="modal fade" id="newLeadModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">{id ? "Update Lead" : "Add New Lead"}</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal"  onClick={resetValues} aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="row">
									<div className="col-6 mb-3">
										<label htmlFor="c_name" className="form-label">Contact Name</label>
										<input readOnly={id ? true : false} value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="c_name" aria-describedby="nameHelp" />
									</div>
									<div className="col-6 mb-3">
										<label htmlFor="c_b_name" className="form-label">Business Name</label>
										<input readOnly={id ? true : false} value={businessName} onChange={(e) => setBusinessName(e.target.value)} type="text" className="form-control" id="c_b_name" aria-describedby="businessNameHelp" />
									</div>
									<div className="col-6 mb-3">
										<label htmlFor="c_phone" className="form-label">Phone</label>
										<input readOnly={id ? true : false} value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="form-control" id="c_phone" aria-describedby="phoneHelp" />
									</div>
									<div className="col-6 mb-3">
										<label htmlFor="c_email" className="form-label">Email address</label>
										<input readOnly={id ? true : false} value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="c_email" aria-describedby="emailHelp" />
									</div>
									<div className="col-12 mb-3">
										<label htmlFor="c_address" className="form-label">Address</label>
										<textarea readOnly={id ? true : false} value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="c_address" aria-describedby="addressHelp"></textarea>
									</div>
									<div className="col-4 mb-3">
										<label htmlFor="c_status" className="form-label">Status</label>
										<select value={status} onChange={(e) => setStatus(e.target.value)} className="form-control" id="c_status" aria-describedby="Status">
											<option>Select</option>
											{
												Configurations.Status.map(status => {
													return <option key={status} value={status}>{status}</option>
												})
											}

										</select>
									</div>
									<div className="col-4 mb-3">
										<label htmlFor="c_assign" className="form-label">Assign To</label>
										<select value={assigned} onChange={(e) => setAssigned(e.target.value)} className="form-control" id="c_assign" aria-describedby="Assign To" disabled={id ? true : false}>
											<option>Select</option>
											{
												users.map(user => {
													return <option key={user._id} value={user._id}>{user.Name}</option>
												})
											}
										</select>
									</div>
									<div className="col-4 mb-3">
										<label htmlFor="c_date" className="form-label">Date</label>
										<input value={moment(date).format('YYYY-MM-DD')} onChange={(e) => setDate(e.target.value)} type="date" className="form-control" id="c_date" aria-describedby="Date" readOnly={id ? true : false} />
									</div>
									{
										id ?
											<div className="col-12 mb-3">
												<label htmlFor="c_comments" className="form-label">Comments</label>
												<textarea value={comments} className="form-control" onChange={(e) => setComments(e.target.value)} id="c_comments" aria-describedby="addressHelp"></textarea>
											</div>
											:
											<></>
									}
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<div className="col-12 px-3">
								<div className="row">
									<div className="col-6 align-self-center">
										<label className="m-0"><input defaultChecked={walkin} onChange={(e) => setWalkin(e.target.checked)} type="checkbox" name="walkin" /> <span>Walkin</span> </label>
									</div>
									<div className="col-6 text-end">
										<button type="button" className="btn btn-secondary m-r-1" data-bs-dismiss="modal" onClick={resetValues}>Cancel</button>
										{
											id ? <button type="button" className="btn btn-success" onClick={handleSubmit}>Update</button> : <button type="button" className="btn btn-success" onClick={handleSubmit}>Submit</button>
										}
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

export default Leads;