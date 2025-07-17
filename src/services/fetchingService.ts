import axios, { isAxiosError } from "axios";
import { type BaseSchema, safeParse } from "valibot";
import { axiosInstance } from "../configs/axios";

export type GetPublicRequest = {
  url: string;
  schema: BaseSchema<any, any, any>;
};

export const getPublicRequest = async <T>({
  url,
  schema,
}: GetPublicRequest): Promise<T> => {
  try {
    const { data: requestData } = await axiosInstance.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const parsedData = safeParse(schema, requestData);

    if (parsedData.success) return parsedData.output;
    else {
      throw new Error(
        `Validation error: ${parsedData.issues
          .map((issue) => issue.message)
          .join(", ")}`
      );
    }
  } catch (error) {
    if (isAxiosError(error)) throw new Error(`Axios error: ${error.message}`);
    else
      throw new Error(
        `Unexpected error: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
  }
};

export type PostPublicRequestProps = {
  url: string;
  schema: BaseSchema<any, any, any>;
  body: object;
  ext?: boolean;
};

export const postPublicRequest = async <T>({
  url,
  schema,
  body,
  ext = false,
}: PostPublicRequestProps): Promise<T> => {
  try {
    const parsedData = safeParse(schema, body);

    const instance = ext ? axios : axiosInstance;

    const { data: requestData } = await instance.post(url, parsedData.output);
    return requestData.data;
  } catch (error) {
    if (isAxiosError(error)) throw new Error(`Axios error: ${error.message}`);
    else
      throw new Error(
        `Unexpected error: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
  }
};

export type PutPublicRequestProps = {
  url: string;
  schema?: BaseSchema<any, any, any>;
  body?: object;
};

export const putPublicRequest = async <T>({
  url,
}: PutPublicRequestProps): Promise<T> => {
  try {
    // const parsedData = safeParse(schema, body);
    const { data: requestData } = await axiosInstance.put(url);
    return requestData.data;
  } catch (error) {
    if (isAxiosError(error)) throw new Error(`Axios error: ${error.message}`);
    else
      throw new Error(
        `Unexpected error: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
  }
};
