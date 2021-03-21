const Schema = {
  openapi: "3.0.2",
  info: {
    title: "forest.ly",
    version: "",
  },
  paths: {
    "/api/test/": {
      get: {
        operationId: "test",
        description: "Simply returns data",
        parameters: [],
        responses: {
          200: {
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    properties: {
                      id: {
                        type: "integer",
                        readOnly: true,
                      },
                      email: {
                        type: "string",
                        format: "email",
                        maxLength: 254,
                      },
                    },
                    required: ["email"],
                  },
                },
              },
            },
            description: "",
          },
        },
      },
    },
  },
};

export default Schema;
