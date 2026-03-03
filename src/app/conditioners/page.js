import React from 'react'
import Navbar from '../components/navbar/Navbar'
import ConditionersPage from './Conditioners'
import Footer from '../components/footer/Footer'

export default function page() {
    return (
        <div>
            <Navbar />
            <ConditionersPage />
            <Footer />
        </div>
    )
};