import axios from 'axios';
import { BASE_URL } from './../Constant/config';
import { getCookies } from './functions';

axios.interceptors.request.use(function (config) {
    const token = getCookies().jcrm_token;
    config.headers.Authorization = token;
    return config;
});

export async function getDashboard() {
    try {
        const response = await axios.get(`${BASE_URL}/v1/dashboard`);
        return response.data;
    } catch (error) {
        return error;
    }
}


export async function getConfigurations() {
    try {
        const response = await axios.get(`${BASE_URL}/v1/configurations`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getLeads(latest = false) {
    try {
        const response = await axios.get(`${BASE_URL}/v1/leads?latest=${latest}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function createLead(data) {
    try {
        const response = await axios.post(`${BASE_URL}/v1/leads`, data);
        return response;
    } catch (error) {
        return error;
    }
}

export async function updateLead(id, data) {
    try {
        const response = await axios.put(`${BASE_URL}/v1/leads/${id}`, data);
        return response;
    } catch (error) {
        return error;
    }
}


export async function getCustomers(latest = false) {
    try {
        const response = await axios.get(`${BASE_URL}/v1/customers?latest=${latest}`);
        return response.data;
    } catch (error) {
        return error;
    }
}
