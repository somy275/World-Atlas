import axios from "axios";
const api = axios.create(
    {
        baseURL: "https://restcountries.com/v3.1/",
    }
);
export const getData = (data) => {
    return api.get(`${data}`); //get data from api
}