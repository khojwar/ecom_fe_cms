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

}

const authSvc = new AuthService();
export default authSvc;