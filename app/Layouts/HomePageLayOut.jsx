import React from 'react'
import HeroSection from '../components/home/banner'
import CollegeSearchSection from '../components/home/CollegeSearchSection'
import FeaturedColleges from '../components/home/FeaturedColleges'
import CollegeGallery from '../components/home/CollegeGallery'

export const HomePageLayout = () => {
    return (
        <div className='text-black'>
            <HeroSection />

            <CollegeSearchSection />

            <CollegeGallery />

            <FeaturedColleges />

        </div>
    )
}
