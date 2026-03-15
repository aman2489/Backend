import { Navigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";


const Protected = ({children}) => {

    const { user, loading } = useAuth();
    
    // console.log(user);

    

    if(loading){
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        )
    }

    if(!user){
        return <Navigate to="/login" />
    }

  return children;
}

export default Protected
