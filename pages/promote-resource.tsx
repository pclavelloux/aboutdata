import React from 'react'
import Container from '@/components/Container';
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { GetServerSideProps } from 'next'
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios'
import Link from 'next/link';

interface Resource {
    id: number;
    title: string;
    description: string;
    url: string;
    url_img: string;
    categories: string;
    tags: string;
    featured: boolean;
    created_at: string;
    updated_at: string;
}

interface PromoteProps {
    product_details: Resource[];
}

export default function Promote(props: PromoteProps) {

    const [imageError, setImageError] = useState(new Map<string, boolean>());
    const [category, setCategory] = useState<string>('Twitter Account')
    const [resourceId, setResourceId] = useState<number>(1)
    const [totalFeatured, setTotalFeatured] = useState<number>(0)
    const [query, setQuery] = useState<string>('')


    const handleCategoryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCategory = e.target.value;
        const newId = e.target.id;
        setCategory(newCategory);
        setResourceId(Number(newId));
        const newTotalFeatured = await getTotalFeaturedByCategory(newCategory);
        setTotalFeatured(newTotalFeatured);
    };

    async function getTotalFeaturedByCategory(category: string) {
        const { data: products, error } = await supabase
            .from('Resources')
            .select()
            .eq('categories', category)

        if (error) throw error

        const totalFeatured = products.reduce(
            (total, product) => total + (product.featured ? 1 : 0),
            0
        )

        return totalFeatured
    }

    async function handleBuyClick(priceId: string, assetId: number) {
        const { data } = await axios.post("/api/checkout_sessions", {
            price_id: priceId,
            asset_id: assetId,
        })


        // Handle the payment - redirect to checkout
        if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

            console.log("redirect")
            console.log(data)
            if (stripe) {
                await stripe.redirectToCheckout({ sessionId: data.checkout_session_id })
            }

        } else {
            console.log("Stripe publishable key is not defined.");
        }

    }

    //Our search filter function
    const searchFilter = (array: PromoteProps['product_details']) => {
        return array.filter(
            (el) => el.title.toLowerCase().includes(query) || el.description.toLowerCase().includes(query)
        )
    }

    //Applying our search filter function to our array of countries recieved from the API
    const filtered = searchFilter(props.product_details)

    //Handling the input on our search bar
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    //Handling image error
    function handleImageError(productId: string) {
        setImageError(imageError.set(productId, true));
    }

    return (<>
        <Container>
            <Navbar />
            <section className="relative">

                {/* Dark background */}

                <div className="relative max-w-6xl mx-auto">
                    <div className="grid grid-cols-8 gap-10">

                        {/* Hero content */}
                        <div className='text-center col-span-4'>
                            <h3 className='h4 font-semibold'>Promote a resource</h3>
                            <p>1. Use the search bar to find a resource. <br />2. Click on the resource you want to promote <br />
                                3. After clicking the &quot;Promote&quot; button are redirected to the checkout. <br />
                                4. Choose a quantity, i.e the number of months to staid promoted. <br /> Ex: A quantity of 3 means the resource will be promoted for 3 months.
                                <br /> <span className='text-sm'>Note : If your resource doesn&lsquo;t appear you need to add it first <Link href="submit-resource">here</Link> or contact <Link href="https://twitter.com/Pauline_Cx">Pauline</Link> </span>
                            </p>

                        </div>
                        <div className='text-center  col-span-4'>
                            <h3 className='h4 font-semibold text-orange-300'>Benefits of promoting a resource</h3>
                            <p>
                                - Resource on top of its corresponding category <br />
                                - Higher visibility <br />
                                - Increase traffic <br />
                            </p>
                        </div>

                    </div>
                </div>
            </section>



            <div className="flex flex-col justify-center items-center max-w-2xl border-gray-700 mx-auto pb-16">
                <div className="flex flex-col-reverse sm:flex-row items-center text-center">
                    <div className="w-80" >

                        <div className='w-full m-auto mt-5 relative flex flex-col md:flex-row justify-between items-start md:items-center gap-5 md:gap-0 mb-4'>
                            <div className="absolute inset-y-0 flex items-center justify-center rounded-full pointer-events-none w-7 h-7 left-2 top-2.5 ">
                                <svg viewBox="0 0 20 20" width="1.2em" height="1.2em" className="w-4 h-4 text-primary" aria-hidden="true">
                                    <path fill="currentColor" fillRule="evenodd" d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8ZM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8Z" clipRule="evenodd">
                                    </path>
                                </svg>
                            </div>
                            <input onChange={handleChange} aria-label="Search" type="search" name="search" id="search" className="block w-full p-3 pl-12 text-base leading-6 text-teal-600 placeholder-gray-400 transition duration-150 ease-in-out border-none appearance-none bg-gray-200 focus:outline-none focus:ring-0" placeholder="Find your resource" />
                        </div>

                        {totalFeatured > 8 ? (<p className='text-orange-300'>Sorry, all promoted seats have been filled for the category {category}</p>) : (
                            <a onClick={() => {
                                if (process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTH_PROMOTE) {
                                    handleBuyClick(process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTH_PROMOTE, resourceId)
                                }
                            }}>
                                <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full">
                                    Promote - 60€
                                </button>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div id="project" className="" data-aos="fade-up">

                <section className="bg-gray-900 py-10 px-12">
                    {/* Content */}
                    <div key={uuidv4()} className="grid md:grid-cols-4  sm:grid-cols-3 gap-4">
                        {/* Card */}
                        {filtered.map((product, index) => (

                            < div key={uuidv4()} className=" bg-white shadow-lg rounded-sm border border-slate-200 duration-300 hover:-translate-y-1" >
                                <form>
                                    <label>
                                        <div key={uuidv4()} className="flex flex-col ">
                                            <input
                                                id={product.id.toString()}
                                                type="radio"
                                                name="resource"
                                                value={product.categories}
                                                onChange={handleCategoryChange}
                                                checked={resourceId === product.id}
                                            />
                                            {/* Image */}
                                            <div className="relative">

                                                <Image key={uuidv4()}
                                                    alt={product.description}
                                                    height={301}
                                                    width={226}
                                                    style={{ objectFit: "cover" }}
                                                    src={!imageError.get(product.id.toString()) && product.url_img ? product.url_img : "/images/no_image.png"}
                                                    priority
                                                    className="rounded-t w-full h-32"
                                                    onError={() => {
                                                        handleImageError(product.id.toString());
                                                    }}
                                                />

                                            </div>

                                            {/* Card Content */}
                                            <div className="grow flex flex-col p-3 text-slate-600 ">
                                                {/* Card body */}
                                                <div className="grow">
                                                    <header className="mb-2">
                                                        <h3 className="text-lg  font-semibold mb-1">{product.title}</h3>
                                                    </header>

                                                    <div className="text-sm h-28">
                                                        <span>{product.description.length > 250 ?
                                                            `${product.description.substring(0, 220)}...` : product.description
                                                        }</span>


                                                    </div>
                                                    <div>
                                                        {product.categories.split(';').map((category, index) => (
                                                            <span key={uuidv4()}>
                                                                {index > 3 ? (null)
                                                                    :
                                                                    (<span key={uuidv4()} className="inline-flex px-1 mr-1 py-1 rounded-sm text-sm text-gray-50 text-center bg-slate-400">{category}</span>
                                                                    )}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </label>
                                </form>
                            </div>
                        )
                        )
                        }
                    </div>
                </section>
            </div>
            <div className='text-center text-gray-400'></div>


        </Container >
    </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { data: product_details } = await supabase.from("Resources").select("*").eq("status", "published");

    const categories = Array.from(new Set(product_details?.flatMap((product) => product.categories.split(';')))); // Need to convert "Set" in an array

    return {
        props: {
            product_details,
            categories,
        },
    };
};