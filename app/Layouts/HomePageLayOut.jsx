import React from 'react'
import HeroSection from '../components/home/banner'
import CollegeSearchSection from '../components/home/CollegeSearchSection'
import FeaturedColleges from '../components/home/FeaturedColleges'
import CollegeGallery from '../components/home/CollegeGallery'
import ResearchPapers from '../components/home/ResearchPapers'
import ReviewSection from '../components/home/ReviewSection'

export const HomePageLayout = () => {
    return (
        <div className='text-black'>
            <HeroSection />

            <CollegeSearchSection />

            <CollegeGallery />

            <FeaturedColleges />

            <ResearchPapers />

            <ReviewSection />
        </div>
    )
}
