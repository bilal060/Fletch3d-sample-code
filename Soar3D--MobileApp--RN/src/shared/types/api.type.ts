export interface APIResponse {
    status: "Success" | "Error" | "ValidationError";
    statusCode: number;
    error: ValidationErrorSchemaInterface[] | string;
    message: string;
    data: any;
}

export interface ValidationErrorSchemaInterface {
    [key: string]: string | string[];
}

export interface APIError {
    data: APIResponse | string;
    error: string;
    originalStatus: number;
    status: string;
}
