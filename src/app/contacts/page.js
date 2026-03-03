import React from 'react'
import Navbar from '../components/navbar/Navbar'
import ContactsPage from './Contacts'
import Footer from '../components/footer/Footer'

export default function page() {
    return (
        <div>
            <Navbar />
            <ContactsPage />
            <Footer />
        </div>
    )
};