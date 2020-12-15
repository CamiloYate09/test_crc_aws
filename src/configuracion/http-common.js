import axios from "axios";

/**
 *Apuntamiento Producción BaCkend CRC
 *     baseURL: "https://backendcrcv1.herokuapp.com/",
 */
export default axios.create({
    baseURL: "https://backendcrcv1.herokuapp.com/",
    timeout: 20000,
    headers: {
        "Content-type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,PATCH',
        'Access-Control-Allow-Headers': 'x-access-token, Origin, X-Requested-With, Content-Type, Accept',
        'X-Requested-With': 'XMLHttpRequest',

    }
});