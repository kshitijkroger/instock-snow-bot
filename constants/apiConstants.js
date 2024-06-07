const axios = require("axios");
const { HttpsProxyAgent } = require("https-proxy-agent");
const { INCIDENT_API, TEST_API } = require("./helper")

const proxy = {
    host: 'cdcproxy.kroger.com',  // Replace with your proxy server's host
    port: 3128,                 // Replace with your proxy server's port
    auth: {
        username: 'dlt6162',  // Replace with your proxy username if needed
        password: '13ma2024'   // Replace with your proxy password if needed
    }
};

const agent = new HttpsProxyAgent({
    host: proxy.host,
    port: proxy.port,
    auth: `${proxy.auth.username}:${proxy.auth.password}`,
    protocol: 'https:'  // Use 'http:' or 'https:' depending on your proxy
});

async function GET_INCIDENT_DETAILS(incidentNumber) {

    const url = `${INCIDENT_API}${incidentNumber.toUpperCase()}`;
    console.log(`Requesting URL: ${url}`);

    const response = await axios.get(url, { httpsAgent: agent }).then((res) => {
        console.log(res);
        return res
    }).catch((err) => {
        console.log(err);
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