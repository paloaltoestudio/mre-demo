export type CreateTraceabilityLogRequest = {
  procedure: string;
  user: string;
  timestamp: string;
  modifiedFields: string;
  procedureStatus: string;
  observations: string;
  ip: string;
};

export type TraceabilityLogResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    id: string;
  };
  errors?: string;
};

export type TraceabilityEvent = {
  procedure: string;
  procedureStatus: string;
  modifiedFields?: Record<string, any>;
  observations?: string;
}; 