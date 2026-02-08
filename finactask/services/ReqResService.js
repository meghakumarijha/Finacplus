// @ts-check
const ApiClient = require('../utils/ApiClient');

class ReqResService {
    constructor() {
        this.api = new ApiClient('https://reqres.in');
    }

    /**
     * @param {string} name
     * @param {string} job
     */
    async registerUser(name, job) {

        return this.api.fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({
                email: "eve.holt@reqres.in",
                password: "pistol"
            })
        });
    }

    /**
     * @param {object} payload
     */
    async createUser(payload) {

        return this.api.post('/api/users', payload);
    }

    /**
     * @param {object} payload 
     */
    async createTestUser(payload) {
         return this.api.fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    }
    /**
     * @param {string|number} id
     */
    async getUser(id) {
        return this.api.get(`/api/users/${id}`);
    }

    /**
     * @param {string|number} id
     * @param {object} payload
     */
    async updateUser(id, payload) {
        return this.api.put(`/api/users/${id}`, payload);
    }
}

module.exports = ReqResService;
