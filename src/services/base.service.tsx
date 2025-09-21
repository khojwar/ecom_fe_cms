import { axiosInstance, type SuccessResponse } from "../config/axios.config";
import type { IConfigParams } from "./service.contract";

abstract class BaseService  {
    async getRequest(url: string, config: IConfigParams = {}): Promise<SuccessResponse> {
        return await axiosInstance.get(url, config);
    }

    async postRequest<T = unknown>(url: string, data: T | null = null, config: IConfigParams = {}): Promise<SuccessResponse> {
        return await axiosInstance.post(url, data, config);
    }

    async putRequest<T = unknown>(url: string, data: T | null = null, config: IConfigParams = {}): Promise<SuccessResponse> {
        return await axiosInstance.put(url, data, config);
    }

    async patchRequest<T = unknown>(url: string, data: T | null = null, config: IConfigParams = {}): Promise<SuccessResponse> {
        return await axiosInstance.patch(url, data, config);
    }

    async deleteRequest(url: string, config: IConfigParams = {}): Promise<SuccessResponse> {
        return await axiosInstance.delete(url, config);
    }
}


export default BaseService;