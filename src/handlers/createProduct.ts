import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import { schemaCreate } from "../interfaces";
import Product from "../model/Product";
import Response from "../model/Response";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const reqBody = JSON.parse(event.body as string);

  await schemaCreate.validate(reqBody);
  // TODO: change the schema validator to JSON Schema

  const product = {
    ...reqBody,
    productID: v4(),
  };

  await Product.createProduct(product);

  return new Response(201, product).send();
};
