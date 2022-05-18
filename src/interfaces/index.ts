import * as yup from "yup";

export interface ProductItem {
  name: string;
  description: string;
  price: number;
  productID: string;
}

export const schemaCreate = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  available: yup.bool().required(),
});
