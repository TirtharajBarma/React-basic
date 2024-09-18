import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected ({children, authentication = true}) {

    const navigate = useNavigate();
    const[loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);


    useEffect(() => {

        // true && true[false !== true] -> move to /login  -> u are not authenticate

        if(authentication && authStatus !== authentication){
            navigate('/login')
        }

        // false && false[true !== true]
        else if (!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoader(false);
    }, [authStatus, navigate, authentication])

  return loader ? <h1>loading....</h1> : <>{children}</>

}

