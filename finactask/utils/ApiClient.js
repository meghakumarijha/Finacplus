// @ts-ignore
require('dotenv').config();

class ApiClient {
    /**
     * @param {string} baseURL 
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    /**
     * @param {string} endpoint 
     * @param {RequestInit} [options] 
     * @returns {Promise<Response>}
     */
    async fetch(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'x-api-key': process.env.REQRES_API_KEY || '',
            ...options.headers
        };

        const config = {
            ...options,
            headers
        };

        console.log(`[API] ${config.method || 'GET'} ${url}`);
        return fetch(url, config);
    }

    /**
     * @param {string} endpoint
     * @param {any} body
     * @returns {Promise<Response>}
     */
    async post(endpoint, body) {
        return this.fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    }

    /**
     * @param {string} endpoint
     * @returns {Promise<Response>}
     */
    async get(endpoint) {
        return this.fetch(endpoint, {
            method: 'GET'
        });
    }

    /**
     * @param {string} endpoint
     * @param {any} body
     * @returns {Promise<Response>}
     */
    async put(endpoint, body) {
        return this.fetch(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    }
}

module.exports = ApiClient;
