export interface IConfigParams {
    headers?: {
        "authorization"?: string,
        "content-Type"?: string,
    }
    params?: {
        [key: string]: any
    }
}