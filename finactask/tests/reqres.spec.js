const { test, expect } = require('@playwright/test');
const ReqResService = require('../services/ReqResService');

test.describe.configure({ mode: 'serial' });

test.describe('Reqres', () => {
    let apiService;
    let createdUserId;

    test.beforeAll(async () => {
        apiService = new ReqResService();
    });

    test('Create User', async () => {
        const createUserPayload = {
            email: "eve.holt@reqres.in",
            password: "System Analyst"
        };

        const response = await apiService.createTestUser(createUserPayload);
        const status = response.status;
        const body = await response.json();

        expect(status).toBe(200);
        expect(body).toHaveProperty('id');
        // expect(body.name).toBe(createUserPayload.name);
        // expect(body.job).toBe(createUserPayload.job);

        createdUserId = body.id;
    });

    test('Fetch User Details', async () => {
        expect(createdUserId).toBeDefined();

        const response = await apiService.getUser(createdUserId);
        const status = response.status;

        console.log(`Fetch user status: ${status}`);

       
        if (status === 200) {
            const body = await response.json();
            console.log('User details:', body);
            expect(body).toBeDefined();
        } else {
            console.log(
                `User ID ${createdUserId} not found — expected behavior in ReqRes`
            );
            expect(status).toBe(404);
        }
    });

    test('Update User Details', async () => {
        expect(createdUserId).toBeDefined();

        const updateUserPayload = {
            name: "Neo",
            job: "Automation Engineer"
        };

        const response = await apiService.updateUser(
            createdUserId,
            updateUserPayload
        );
        const status = response.status;
        const body = await response.json();

        expect(status).toBe(200);
        expect(body.name).toBe(updateUserPayload.name);
        expect(body.job).toBe(updateUserPayload.job);
        expect(body).toHaveProperty('updatedAt');
    });
});
