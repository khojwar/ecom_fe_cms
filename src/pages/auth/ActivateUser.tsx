import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import Spinner from "../../components/Spinner";

const ActivateUser = () => {

    const [loading, setLoading] = useState(true);

    let params = useParams();

    let [searchParams] = useSearchParams();
    // let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        // simulate api call
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [])

    return (
        <div className="text-center">
            <h2>Activate User Page</h2>
            <p>Query Param - ref: <span className="font-bold">{searchParams.get('name')?.toUpperCase()}</span></p>

            {
                loading ? <p> <Spinner /></p> : <p>{params.token}</p>
            }
        </div>
    )
}

export default ActivateUser;