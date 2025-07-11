import React from 'react'
import HeroSection from '../components/home/banner'
import CollegeSearchSection from '../components/home/CollegeSearchSection'

export const HomePageLayout = () => {
    return (
        <div className='text-black'>
            <HeroSection />

            <CollegeSearchSection />

        </div>
    )
}
