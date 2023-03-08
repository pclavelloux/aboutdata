import React from 'react'
import Navbar from '@/components/Navbar';
import Container from '@/components/Container';

export default function Custom404() {
    return (
        <>
            <Container>
                <Navbar />
                <h2 className='h2 text-center pb-72'>Oops, page not found</h2>
            </Container >
        </>


    )

}