

import { useNavigate, useParams } from "react-router";
import Spinner from "../../components/Spinner";
import { useEffect } from "react";
import { toast } from "sonner";
import authSvc from "../../services/auth.service";
import type { SuccessResponse } from "../../config/axios.config";

const ActivateUser = () => {

    const params = useParams()
    const navigate = useNavigate();

    const activateUserProfile = async () => {
        try {
            const response = await authSvc.activateUserProfile(params.token as string) as unknown as SuccessResponse;
            toast.success("Account activated successfully.", { description: response?.message });
            navigate("/");
            
        } catch (exception: any) {
            toast.error(exception?.message);
            navigate("/");
        }
    }

    useEffect(() => {
        activateUserProfile();
    }, [])


    return (
        <div className="text-center">
            {
                <p> <Spinner /></p>
            }
        </div>
    )
}

export default ActivateUser;