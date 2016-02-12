"use strict";
let should = require("should");
let mongoose = require("mongoose");
let request = require("supertest");

let app = require("../../server");
let Beer = mongoose.model("Beer");

describe("GET /beer", () => {
    it("Should return a status of 200", (done) => {
        request(app)
        .get("/beers?name=shiner")
        .expect(200)
        .end(done);
    });
    it("Should return a status of 200", (done) => {
        request(app)
        .get("/beers")
        .expect(200)
        .end(done);
    });
});
