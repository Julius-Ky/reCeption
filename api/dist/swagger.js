"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const doc = {
    info: {
        version: "v1.0.0",
        title: "Reception API",
        description: "Implementation of AI Smart Contact Analysis in the NEAR blockchain",
    },
    servers: [
        {
            url: "http://localhost:8080",
            description: "local",
        },
        {
            url: "https://reception-vn4m.onrender.com",
            description: "remote",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
        schemas: {
            UserRequest: {
                user_id: "string",
                contract: "string",
                api_key: "string",
            },
        },
    },
};
const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes/index.ts"];
(0, swagger_autogen_1.default)({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
