import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { generator } from "/opt/nodejs/src";
import Product from "../model/Product";
import Response from "../model/Response";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const productID = event.pathParameters?.productID || "";

  // this reference of a javascript layer works
  console.log(generator("Andres"));

  const product = await Product.fetchProductById(productID);

  return new Response(200, product).send();
};
