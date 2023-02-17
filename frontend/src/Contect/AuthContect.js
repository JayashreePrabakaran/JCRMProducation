import React, { createContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { getCookies } from './../Utils/functions';
import { userData } from './../Redux/reducers/user';
import {setCookie} from './../Utils/functions'
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [userToken, setUserToken] = useState('');
    const dispatch = useDispatch();
    const loginUser = (username, password, e) => {
        e.preventDefault();
        try {
            axios.post('/auth/login', { username, password })
                .then(res => {
                    setLoading(true);
                    console.log(res.data)
                    setCookie('jcrm_token', res.data, 14)
                    const token = res.data;
                    let data = jwt_decode(token);
                    dispatch(userData(data));
                    setUserToken(token);
                    setLoading(false);
                }).catch(err => {
                    alert(err.response.data.msg)
                    setLoading(false);
                })
        } catch (err) {
            setLoading(false);
            console.log(`error while login`, err)
        }
    }

    const logOutUser = () => {
        setLoading(true);
        const token = getCookies().jcrm_token;
        if (token) {
            document.cookie =
                "jcrm_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;";
        }
        setLoading(false);
        window.location.href = "/";
    }

    const isLoggedIn = async () => {
        try {
            const token = getCookies().jcrm_token;
            if (token) {
                let data = jwt_decode(token);
                dispatch(userData(data));
                setLoading(true);
                setUserToken(token);
                setLoading(false);
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        isLoggedIn();
    })


    return (
        <AuthContext.Provider value={{ loginUser, logOutUser, loading, userToken }}>
            {children}
        </AuthContext.Provider>
    )
}