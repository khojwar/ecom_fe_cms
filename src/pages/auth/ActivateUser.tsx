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
        <div>

            <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
                <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 text-center">
                    <h2>Activate User Page</h2>
                    <p>Query Param - ref: <span className="font-bold">{searchParams.get('name')?.toUpperCase()}</span></p>

                    {
                        loading ? <p> <Spinner /></p> : <p>{params.token}</p>
                    }
                </div>
            </div>


        </div>
    )
}

export default ActivateUser;