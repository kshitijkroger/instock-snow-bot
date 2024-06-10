const axios = require("axios");
const { INCIDENT_API, TEST_API } = require("./helper")

async function GET_INCIDENT_DETAILS(incidentNumber) {

    const url = `${INCIDENT_API}${incidentNumber.toUpperCase()}`;
    console.log(`Requesting URL: ${url}`);

    const response = await axios.get(url).then((res) => {
        console.log(res);
        return res
    }).catch((err) => {
        console.log(err);
        return err
    })

    return response;
}

async function TEST_APPLICATION() {

    try {
        const response = await axios.get('https://instock-snow-api.azurewebsites.net/api/test', {
            httpsAgent: agent,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'InStockBot',
            }
        });
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error calling API:', error.message);

        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Request setup error:', error.message);
        }
        throw error;
    }
}

module.exports = {
    GET_INCIDENT_DETAILS,
    TEST_APPLICATION
}