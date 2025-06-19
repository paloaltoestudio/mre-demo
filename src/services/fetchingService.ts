import { isAxiosError } from "axios";
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
      }
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
