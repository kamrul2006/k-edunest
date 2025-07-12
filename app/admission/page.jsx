import React from 'react'
import Footer from '../components/Fixed/Footer'
import Navbar from '../components/Fixed/NavBar'
import AdmissionPage from '../components/others/AdmissionPage'

const page = () => {
    return (
        <div>
            <Navbar />

            <AdmissionPage />

            <Footer />
        </div>
    )
}

export default page