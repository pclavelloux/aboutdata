import React from 'react'
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import Form from "@/components/FormInput"

export default function contact() {

    const handleChange = (e) => {
        setAssetData({ ...assetData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Container>
                <Navbar />
                <main className="grow">

                    <section>
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
                            <div >
                                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 py-6">
                                    <div className="w-full md:max-w-full mx-auto">
                                        <div className="p-6 border border-gray-300 sm:rounded-md">
                                            <h2 className="h2 mb-4">Add a resource</h2>

                                            <section>
                                                <h3 className=" leading-snug mt-5 font-bold mb-1">Name of your asset*</h3>
                                                <Form type="text" id="title" name="title" placeholder="" value="" onChange={handleChange} />

                                                <h3 className=" leading-snug mt-5 font-bold mb-1">Enter image link</h3>

                                                <div className="md:flex md:items-center mb-6">
                                                    <Form type="text" name="demo_link" id="demo_link" placeholder="https://pbs.twimg.com/profile_images/1610205816648245250/e2kaBgcJ_400x400.jpg" value="" onChange={handleChange} />
                                                </div>

                                                <label className="block mb-6">
                                                    <h3 className=" leading-snug mt-5 font-bold mb-1">Enter a short description <span className='text-xs'>(200 caracters max)*</span>
                                                    </h3>

                                                    <textarea
                                                        name="description"
                                                        className=" block w-full mt-1 pl-1 border-gray-300 rounded-md shadow-sm focus:border-gray-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                                                        rows={3} placeholder="Creators who share data science tips"
                                                        value="" onChange={handleChange}
                                                    ></textarea>
                                                </label>

                                                <label className="block mb-6">
                                                    <h3 className=" leading-snug mt-5 font-bold mb-1">Main categories*  <span className='text-xs'>(separated with ";")</span></h3>
                                                    <textarea
                                                        name="technologies"
                                                        className=" block w-full mt-1 pl-1 border-gray-300 rounded-md shadow-sm focus:border-gray-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                                                        rows={2} placeholder="Twitter account;Course;Blog"
                                                        value="" onChange={handleChange}
                                                    ></textarea>
                                                </label>

                                                <h3 className=" leading-snug mt-5 font-bold mb-1">Link to the resource </h3>
                                                <div className="md:flex md:items-center mb-6">
                                                    <Form type="text" name="demo_link" id="demo_link" placeholder="https://twitter.com/Pauline_Cx" value="" onChange={handleChange} />
                                                </div>
                                            </section>

                                            <div className='pt-10'>
                                                <button
                                                    type="submit"
                                                    className="h-10 px-5 bg-teal-500 text-white rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-teal-600 "

                                                >
                                                    <span className="ml-2">Add your code</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center w-full bg-slate-900 hidden md:block">
                                        <Image
                                            alt="Add data resource"
                                            height={405}
                                            width={540}
                                            src="/images/add.png"
                                            sizes="30vw"
                                            priority
                                            className="mx-auto md:max-w-none rounded-md"
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </Container >
        </>
    )
}
