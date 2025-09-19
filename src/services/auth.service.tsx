import type { ICredentials } from "../components/auth/contract";
import type { IFormInput } from "../components/auth/RegisterForm";
import type { SuccessResponse } from "../config/axios.config";
import BaseService from "./base.service";


class AuthService extends BaseService {

    async registerUser(data: IFormInput) {
        return await this.postRequest("/auth/register", data, {
                headers: {
                  "content-Type": "multipart/form-data",
                },
              }) as unknown as SuccessResponse;
    }

    async activateUserProfile(token: string) {
        return await this.getRequest(`/auth/activate/${token}`);
    }

    async loginUser(credentials: ICredentials) {
        const response = await this.postRequest('/auth/login', credentials) as unknown as SuccessResponse;
        localStorage.setItem('access_token', response.data.accessToken);
        localStorage.setItem('refresh_token', response.data.refreshToken);
    }

    async getLoggedInUserProfile() {
        // return await this.getRequest('/auth/me', {
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('access_token')}`
        //     }
        // }) as unknown as SuccessResponse;

        
        // ------------------------- or -------------------------
        // if you have set the interceptor in axios config file
        // header will be added from axios config
        return await this.getRequest('/auth/me') as unknown as SuccessResponse;
    }

}

const authSvc = new AuthService();
export default authSvc;