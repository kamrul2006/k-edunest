import React from 'react'
import Navbar from '../components/Fixed/NavBar'
import Footer from '../components/Fixed/Footer'
import MyCollege from '../components/others/my-college'

const page = () => {
    return (
        <div>
            <Navbar />

            <MyCollege />

            <Footer />
        </div>
    )
}

export default page