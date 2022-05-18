import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import Product from "../model/Product";
import Response from "../model/Response";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const productID = event.pathParameters?.productID;
  const reqBody = JSON.parse(event.body as string);

  const product = {
    ...reqBody,
    productID,
  };

  await Product.updateProduct(product);

  return new Response(200, product).send();
};
