"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractsRouter = void 0;
const express_1 = require("express");
exports.contractsRouter = (0, express_1.Router)();
const contracts = [
    { user_id: "user1.testnet", contract: "John Doe" },
    { user_id: "user1.testnet", contract: "Jane Doe" },
];
exports.contractsRouter.get("/getContracts", (req, res) => {
    res.status(200).json(contracts);
});
exports.contractsRouter.get("/analyze", (req, res) => {
    res.status(200).json({ confidence: 80.4, predicted_class: "Reentrancy" });
});
