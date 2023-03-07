import React from 'react'
import Navbar from '@/components/Navbar';
import Container from '@/components/Container';


export default function Success() {
    return (
        <>
            <Container>

                <Navbar />
                <h2 className='h2 text-center pb-72'>Congratulations, your resource is now promoted</h2>
            </Container >
        </>

    )

}