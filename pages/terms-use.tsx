import React from 'react'
import Container from '@/components/Container';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function tos() {
    return (

        <>
            <Container>
                <Navbar />

                <section className="bg-white">
                    <div className=" max-w-7xl mx-auto py-6 sm:px-6">
                        <div className="py-12 md:py-20">
                            <h1 className='mb-10'>Terms of Use</h1>
                            <p>These&nbsp;Terms and Conditions&nbsp;constitute a legally binding agreement made between you,
                                whether personally or on behalf of an entity (&ldquo;you&rdquo;) and&nbsp;Wintopy SAS, doing
                                business as Wintopy &nbsp;(&ldquo;Wintopy&rdquo;,
                                &ldquo;<strong>we</strong>&rdquo;, &ldquo;<strong>us</strong>&rdquo;, or
                                &ldquo;<strong>our</strong>&rdquo;), concerning your access to and use of this website.
                            </p>


                            <h3 className='mb-8 mt-8'>Description of Service</h3>
                            <p>
                                Our website provides users with resources related to data profession. Users can browse and search for resources, as well as pay to
                                promote a resource to the top of the page. Some resources may include
                                affiliate links.
                            </p>
                            <h3 className='mb-8 mt-8'>Acceptable Use</h3>
                            <p>
                                You may use our website for lawful purposes only. You may not use our
                                website in any way that violates any applicable laws or regulations,
                                infringes on the rights of others, or interferes with the operation of
                                our website.
                            </p>
                            <h3 className='mb-8 mt-8'>User Accounts</h3>
                            <p>
                                You may need to create a user account to access certain features of our
                                website. You are responsible for maintaining the confidentiality of
                                your account information, including your username and password. You are
                                also responsible for all activity that occurs under your account.
                            </p>
                            <h3 className='mb-8 mt-8'>Promoted Resources</h3>
                            <p>
                                If you pay to promote a resource on our website, your resource will be
                                featured at the top of the page for the duration of the promotion. We
                                reserve the right to reject any resource that we deem inappropriate or
                                that violates these terms of use. We also reserve the right to remove any
                                promoted resource at any time for any reason.
                            </p>
                            <h3 className='mb-8 mt-8'>Affiliate Links</h3>
                            <p>
                                Some resources on our website may include affiliate links. This means
                                that we may earn a commission if you click on the link and make a
                                purchase. We only include affiliate links for products or services that
                                we believe will be of interest to our users.
                            </p>
                            <h3 className='mb-8 mt-8'>  Refunds</h3>
                            <p>
                                If you purchase a promoted resource on our website, we do not offer refunds for any months that have already begun.
                                However, if you cancel your promotion before the start of the next month, we will not charge you for that month and
                                you will not be entitled to any refund for the current month.
                                This section clarifies that you do not offer refunds for months that have already started,
                                but you do offer the option to cancel the promotion before the start of the next month to avoid being charged.
                            </p>
                        </div>

                    </div>
                </section>

            </Container>
        </>
    )
}
