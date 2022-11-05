"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const rentableNFTRouter_1 = require("../routes/rentableNFTRouter");
const app = express();
// middleware
// Uncomment this line if we want to start using ID token for authentication
// app.use(verifyIdToken);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/v1/rentableNFT", rentableNFTRouter_1.default);
// routes
app.get("/", (req, res) => res.status(200).send("hello IP3"));
// Invalid routes
app.all("*", (req, res) => {
    res.status(404).send("API resource not found.");
});
exports.default = app;
//# sourceMappingURL=mainApp.js.map