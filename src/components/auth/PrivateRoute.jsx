import { RedirectToSignIn, useAuth } from '@clerk/react';

const PrivateRoute = ({children})=>{
    const { isSignedIn } = useAuth()
    if (!isSignedIn) {
        return <RedirectToSignIn />
    } else {
        return (
            <>{children}</>
        )
    }
}

export default PrivateRoute;