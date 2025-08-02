import type { InferInput } from "valibot";
import type { ResponseDependentsSchema } from "../../schemas/appointments/dependentsSchema";

export type DependentInformationType = {
  label: string;
  value: string;
};

export type ResponseDependentsType = InferInput<
  typeof ResponseDependentsSchema
>;
