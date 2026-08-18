const request = require("supertest");
const express = require("express");

const app = express();

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        application: "AutoHeal",
        version: "1.0.0"
    });
});

describe("AutoHeal Health Check", () => {

    test("Health endpoint should return 200", async () => {
        const response = await request(app).get("/health");

        expect(response.statusCode).toBe(200);
    });

    test("Application should be healthy", async () => {
        const response = await request(app).get("/health");

        expect(response.body.status).toBe("healthy");
    });

});