import express from "express";
import "reflect-metadata";
import path from "path";
import { createExpressServer } from "routing-controllers";
// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  routePrefix: "api",
  controllers: [path.join(`${__dirname}/controllers/**/*.controller.ts`)], // we specify controllers we want to use
  middlewares: [path.join(`${__dirname}/middlewares/**/*.middleware.ts`)],
});

// run express application on port 3000
app.listen(3001);
