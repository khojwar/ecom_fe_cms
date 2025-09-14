import { useParams, useSearchParams } from "react-router";

const ActivateUser = () => {

    let params = useParams();

    let [searchParams] = useSearchParams();
    // let [searchParams, setSearchParams] = useSearchParams();



    return (
        <div>
            <h2>Activate User Page</h2>
            <p>Query Param - ref: {searchParams.get('name')}</p>
            <p>{params.token}</p>
        </div>
    )
}

export default ActivateUser;