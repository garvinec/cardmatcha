import swaggerJsdoc from "swagger-jsdoc";
import { version } from "../../package.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Credexa API Documentation",
      version,
      description:
        "API documentation for Credexa credit card comparison platform",
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
      contact: {
        name: "API Support",
        url: "https://credexa.com/support",
        email: "support@credexa.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Cards",
        description: "Credit card operations",
      },
      {
        name: "Health",
        description: "API health check",
      },
    ],
    components: {
      schemas: {
        Card: {
          type: "object",
          required: ["id", "name", "issuer"],
          properties: {
            id: {
              type: "string",
              description: "The auto-generated id of the credit card",
            },
            name: {
              type: "string",
              description: "The name of the credit card",
            },
            issuer: {
              type: "string",
              description: "The issuer of the credit card",
            },
            category: {
              type: "string",
              description: "The category of the credit card",
            },
            annualFee: {
              type: "number",
              description: "The annual fee of the credit card",
            },
            rewardsRate: {
              type: "number",
              description: "The rewards rate of the credit card",
            },
            introApr: {
              type: "string",
              description: "The introductory APR of the credit card",
            },
            regularApr: {
              type: "string",
              description: "The regular APR of the credit card",
            },
            creditScoreRequired: {
              type: "string",
              description: "The credit score required for the credit card",
            },
            imageUrl: {
              type: "string",
              description: "The image URL of the credit card",
            },
          },
        },
        Error: {
          type: "object",
          required: ["success", "error"],
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            error: {
              type: "string",
              example: "Error message",
            },
          },
        },
        CardResponse: {
          type: "object",
          required: ["success", "data"],
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            data: {
              $ref: "#/components/schemas/Card",
            },
          },
        },
        CardsResponse: {
          type: "object",
          required: ["success", "data", "pagination"],
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Card",
              },
            },
            pagination: {
              type: "object",
              properties: {
                total: {
                  type: "number",
                  example: 100,
                },
                page: {
                  type: "number",
                  example: 1,
                },
                limit: {
                  type: "number",
                  example: 10,
                },
                totalPages: {
                  type: "number",
                  example: 10,
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export const specs = swaggerJsdoc(options);
