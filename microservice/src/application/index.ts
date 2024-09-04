// All necesary imports for the application are defined here
"use strict";
import "reflect-metadata";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, Handler } from "aws-lambda";
import awsServerlessExpress from "aws-serverless-express";
import express from "express";
import { cache } from "./config/cache";
import { IndexController } from "../infrastructure/entry-points/controllers/index.controller";

// Create the express app
export const app = express();
const server = awsServerlessExpress.createServer(app);

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult | any> => {
  const indexController: IndexController = cache.resolve("IndexController");
  return await indexController.analyzePath(event);
};

