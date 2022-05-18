import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import Product from "../model/Product";
import Response from "../model/Response";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const productID = event.pathParameters?.productID || "";

  await Product.deleteProduct(productID);

  return new Response(200, { message: `Product with the id ${productID} was deleted!` }).send();
};
