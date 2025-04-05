import axios from "axios";

export default axios.create({
    baseURL: "https://gm0mcs32-8080.use.devtunnels.ms",
    headers: {"Access-Control-Allow-Origin": "*"}

});