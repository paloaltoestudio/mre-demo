import { object, string, number, boolean } from "valibot";

export const CreateTraceabilityLogSchema = object({
  procedure: string(),
  user: string(),
  timestamp: string(),
  modifiedFields: string(),
  procedureStatus: string(),
  observations: string(),
  ip: string(),
});

export const TraceabilityLogResponseSchema = object({
  statusCode: number(),
  success: boolean(),
  message: string(),
  data: object({
    id: string(),
  }),
  errors: string().optional(),
}); 