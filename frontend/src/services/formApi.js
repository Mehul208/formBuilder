import axios from "axios";
const url = "http://localhost:8080/api";

export const getAllForms = async () => {
    const { data: res } = await axios.get(`${url}/forms/all`);
    return res;
};

export const getData = async (data) => {
    const { data: res } = await axios.post(`${url}/forms/data`, data);
    return res;
};

export const updateData = async (data) => {
    const { data: res } = await axios.post(`${url}/forms/update`, data);
    return res;
};

export const createForm = async (data) => {
    const { data: res } = await axios.post(`${url}/forms/create`, data);
    return res;
};
