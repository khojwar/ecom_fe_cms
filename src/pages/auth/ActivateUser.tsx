import { useParams } from "react-router";

const ActivateUser = () => {

    let params = useParams();


    return (
        <div>
            <h2>Activate User Page</h2>
            <p>{params.token}</p>
        </div>
    )
}

export default ActivateUser;