import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contect/AuthContext';

const SidebarMenu = (props) => {
    const {logOutUser} = useContext(AuthContext);

    const handleLogout = (e) => {
        e.preventDefault();
        logOutUser();
    }
    return (
        <React.Fragment>
            <div className="nav px-1" style={{ position: 'fixed' }}>
                <div className="col-12 p-a-0 text-center">
                    <h1 className="logo">
                        <a href="/">
                            <img src="images/logo.png" alt="XUVI" width="48" /><span>XUVI JCRM</span>
                        </a>
                    </h1>
                </div>
                <div className="col-12 nav-sec p-a-0">
                    <ul>
                        <li><Link to="/" title="Dashboard" className={props.name === 'dashboard' ? "active" : ""}> <i className="fa fa-th-large"></i> <span>Dashboard</span></Link></li>
                        <li><Link to="/leads" title="Leads" className={props.name === 'leads' ? "active" : ""} ><i className="fa fa-users"></i> <span>Leads</span></Link></li>
                        <li><Link to="/lead-details" title="Lead Details" className={props.name === 'lead-details' ? "active" : ""}><i className="fa fa-users"></i> <span>Lead Details</span></Link></li>
                        <li><Link to="/customer" title="Customers" className={props.name === 'customer' ? "active" : ""}><i className="fa fa-users"></i> <span>Customers</span></Link></li>
                    </ul>
                    <ul className="pos-bt">
                        <li><Link to="/" title="Account"><i className="fa fa-user"></i> <span>Account</span></Link></li>
                        <li><Link onClick={handleLogout} to="/" title="Logout"><i className="fa fa-sign-out"></i> <span>Logout</span></Link></li>
                        {/* <li><Link to="/logout" title="Logout"><i className="fa fa-sign-out"></i> <span>Logout</span></Link></li> */}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )

}

export default SidebarMenu;