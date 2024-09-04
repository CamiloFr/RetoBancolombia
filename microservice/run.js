const app = require("./dist/application/index");

const event = {
  httpMethod: "GET",
  path: "/health",
  pathParameters: {
    email: "camiloes94@hotmail.com",
  },
  body: { 'email': 'camiloes94@hotmail.com', 'name': 'Camilo Andres', 'phone': '300000000', 'country': 'Colombia', 'city': 'Bogota', 'password': '123', 'type': 'USER' },
};

const context = { invokedFunctionArn: "ARN" };
app
  .handler(event, context)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
