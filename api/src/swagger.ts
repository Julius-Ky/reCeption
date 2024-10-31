import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v1.0.0",
    title: "Reception API",
    description:
      "Implementation of AI Smart Contact Analysis in the NEAR blockchain",
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "",
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

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
