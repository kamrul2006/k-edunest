import React from 'react'
import HeroSection from '../components/home/banner'
import CollegeSearchSection from '../components/home/CollegeSearchSection'
import FeaturedColleges from '../components/home/FeaturedColleges'
import CollegeGallery from '../components/home/CollegeGallery'
import ResearchPapers from '../components/home/ResearchPapers'
import ReviewSection from '../components/home/ReviewSection'
import { AboutUsSection } from '../components/home/AboutUsSection'
import Navbar from '../components/Fixed/NavBar'
import Footer from '../components/Fixed/Footer'

export const HomePageLayout = () => {
    return (
        <div className='text-black'>
            <Navbar />

            <HeroSection />

            <CollegeSearchSection />

            <AboutUsSection />

            <CollegeGallery />

            <FeaturedColleges />

            <ResearchPapers />

            <ReviewSection />

            <Footer />
        </div>
    )
}
