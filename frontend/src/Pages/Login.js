import React, {useContext, useState} from 'react';
import { AuthContext } from '../Contect/AuthContect';


const Login = (props) => {

    const {loginUser} = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <React.Fragment>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-8 lg-sec bg-sec">

                    </div>
                    <div className="col-sm-4 lg-sec ">
                        <div className="lg-form">
                            <div className="col-xs-12 p-a-0 text-xs-center">
                                <h1>Stay connected with your business always!</h1>
                                <h3>Best business management software - Automobiles, Saloon & Spa, Health & Wellness</h3>
                            </div>
                            <div className="col-xs-12 p-a-0 m-t-1">
                                <form id="validateLoginForm" className="cs-form text-left">
                                    <div className="form-group">
                                        <label htmlFor="email" className="form-lbl">Email Address</label>
                                        <div className="lg-icon"><i className="fa fa-envelope"></i></div>
                                        <input type="email" onChange={(e) => setUsername(e.target.value)} name="email" className="form-control email mand-fld" id="email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pw" className="form-lbl">Password</label>
                                        <div className="lg-icon"><i className="fa fa-unlock-alt"></i></div>
                                        <input type="password" onChange={(e) => setPassword(e.target.value)} name="pwd" className="form-control pwd mand-fld" id="pwd" />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn cs-btn btn-sm submitBtn col-md-12 m-t-1" onClick={(e) => loginUser(username, password, e)}>
                                            Log In
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="copyrights">
                            <p>
                                <a href="">Privacy Policy</a>
                                &copy; 2022 <a href="https://xuvi.com/"  rel="noreferrer"  target="_blank">XUVI</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login