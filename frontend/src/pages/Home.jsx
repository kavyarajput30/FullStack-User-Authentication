import React from 'react'
import axios from 'axios';
import { useEffect } from 'react'
function Home() {

    useEffect(() => {
        axios.get("/").then((res) => {
            // console.log(res);/
        })

    },[]);
    return (
        <h1>Home Page.</h1>
    )
}

export default Home
