import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function NoMatch() {
    const navigete = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigete("/")
        }, 2000)
    }, []);


    return (

        <div className="error-page"><h1>קישור שבור או שהתנתקת מהאתר... מעביר אותך להתחברות מחדש</h1>
            <img height="500px" width="500px" src="https://ps.w.org/broken-link-checker/assets/icon-256x256.png?rev=2205502" alt="brokenLink" />

        </div>

    )
}

export default NoMatch