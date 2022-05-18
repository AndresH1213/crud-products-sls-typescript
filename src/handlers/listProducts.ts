import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import Product from "../model/Product";
import Response from "../model/Response";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const products = await Product.listProducts();

  return new Response(200, products).send();
};
