import React from 'react'
import Navbar from '../components/Fixed/NavBar'
import Footer from '../components/Fixed/Footer'
import CollegesPage from '../components/others/CollegesPage'

const page = () => {
    return (
        <div>
            <Navbar />

            < CollegesPage />

            <Footer />
        </div>
    )
}

export default page