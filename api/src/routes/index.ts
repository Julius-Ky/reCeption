import express from "express";

import { contractsRouter } from "./contract";

export const routes = express.Router();

routes.use("/api/contract", contractsRouter);
