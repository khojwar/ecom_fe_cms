export interface IConfigParams {
    headers?: {
        "authorization"?: string,
        "content-Type"?: string,
        "Cache-Control"?: string,
        "Pragma"?: string,
    }
    params?: {
        [key: string]: any
    }
}
