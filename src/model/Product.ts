import httpError from "./Error";
import AWS from "aws-sdk";
import { ProductItem } from "../interfaces";

const dynamoClient = new AWS.DynamoDB.DocumentClient();

export default class Product {
  static readonly tableName = "ProductsTable";

  static async fetchProductById(id: string) {
    const result = await dynamoClient
      .get({
        TableName: Product.tableName,
        Key: {
          productID: id,
        },
      })
      .promise();

    if (!result.Item) {
      throw new httpError(404, { error: "not found" });
    }
    return result.Item;
  }

  static async insertProductDynamo(product: ProductItem) {
    try {
      await dynamoClient
        .put({
          TableName: Product.tableName,
          Item: product,
        })
        .promise();
    } catch (error) {
      throw new httpError(500, { error });
    }
  }

  static async createProduct(productItem: ProductItem) {
    await this.insertProductDynamo(productItem);
  }

  static async updateProduct(newProduct: ProductItem) {
    await this.fetchProductById(newProduct.productID);
    await this.insertProductDynamo(newProduct);
  }

  static async deleteProduct(id: string) {
    await this.fetchProductById(id);
    try {
      await dynamoClient
        .delete({
          TableName: Product.tableName,
          Key: {
            productID: id,
          },
        })
        .promise();
    } catch (error) {
      throw new httpError(500, { error: "Error deleting product" });
    }
  }

  static async listProducts() {
    try {
      const { Items: products } = await dynamoClient.scan({ TableName: Product.tableName }).promise();
      return products;
    } catch (error) {
      throw new httpError(500, { error: "Error retrieving the list of products" });
    }
  }
}
