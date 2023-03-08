import React from 'react'
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import Form from "@/components/FormInput"
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
export default function SubmitResource() {

    const initialState = {
        title: "",
        description: "",
        url_resource: "",
        url_img: "",
        categories: "",
        tags: "",
        status: "unpublished",
        featured: "",
    };

    const [resourceData, setResourceData] = useState(initialState);
    const { title, description, url_resource, url_img, categories, tags } = resourceData;



    // When form value is changed
    const handleChange = <T extends HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement>(e: React.ChangeEvent<T>) => {
        setResourceData({ ...resourceData, [e.target.name]: e.target.value });
    };

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        if (title.trim() === "") {
            alert("Please enter a title for the resource");
            return;
        }
        if (categories.length === 0) {
            alert("Please select at least one category for the resource");
            return;
        }
        if (url_resource.trim() === "") {
            alert("Please enter a URL for the resource");
            return;
        }
        createResource();
    }

    const createResource = async () => {

        try {
            //Insert data in db
            const { data: resourceData, error: resourceError } = await supabase
                .from("Resources")
                .insert([
                    {
                        title,
                        description,
                        url_resource,
                        url_img,
                        tags,
                        categories,
                    },
                ])
                .select('*')
                .single();
            console.log(resourceData);
            if (resourceData) {
                console.log(resourceData);
                alert("Resource successfully sent. It will be reviewed before being published. Thank you for contributing!");
                setResourceData(initialState);
            } else if (resourceError) {
                alert("Something went wrong, please try again or contact Pauline_Cx to report this issue");
            }
        }
        catch (error: any) {
            alert(error.message);
        }
    }
    return (
        <>
            <Container>
                <Navbar />
                <main className="grow">
                    <section>
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
                            <div >
                                <div className="grid lg:grid-cols-2 gap-4 py-6">
                                    <div className="w-full md:max-w-full mx-auto">
                                        <div className="p-6 border border-gray-300 sm:rounded-md">
                                            <h2 className="h2 mb-4">Add a resource</h2>
                                            <section>

                                                <h3 className=" leading-snug mt-5 font-bold mb-1">Name of your resource*</h3>
                                                <input className="bg-gray-200 w-full  border-2  border-gray-200 rounded py-1 px-1 text-teal-600 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                                                    id="title"
                                                    name="title"
                                                    type="text"
                                                    placeholder=""
                                                    value={title}
                                                    onChange={handleChange}
                                                    required
                                                />

                                                <h3 className=" leading-snug mt-5 font-bold mb-1">Link to the resource *</h3>
                                                <p className='text-xs pb-2'>Ex: link to the course, the twitter profile, the blog, the library...</p>
                                                <div className="md:flex md:items-center mb-6">
                                                    <Form type="text" name="url_resource" id="url_resource" placeholder="https://twitter.com/Pauline_Cx" value={url_resource} onChange={handleChange} />
                                                </div>


                                                <h3 className=" leading-snug mt-5 font-bold mb-1">Image link <span className='text-xs'>(If relevant)</span></h3>
                                                <div className="md:flex md:items-center mb-6">
                                                    <Form type="text" name="url_img" id="url_img" placeholder="https://pbs.twimg.com/profile_images/1610205816648245250/e2kaBgcJ_400x400.jpg" value={url_img} onChange={handleChange} />
                                                </div>
                                                <label className="block mb-6">
                                                    <h3 className=" leading-snug mt-5 font-bold mb-1">Enter a short description <span className='text-xs'>(160 caracters max)</span>
                                                    </h3>
                                                    <textarea
                                                        name="description"
                                                        className=" block w-full mt-1 pl-1 border-gray-300 rounded-md text-teal-600 shadow-sm focus:border-gray-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                                                        rows={3} placeholder="Creators who share data science tips"
                                                        value={description}
                                                        maxLength={160}
                                                        onChange={handleChange}
                                                    ></textarea>
                                                </label>

                                                <label className="block mb-6">
                                                    <h3 className="leading-snug mt-5 font-bold mb-1">Main category* </h3>
                                                    <select
                                                        name="categories"
                                                        className="block w-full mt-1 pl-1 border-gray-300 rounded-md text-teal-600 shadow-sm focus:border-gray-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                        value={categories}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select a category</option>
                                                        <option value="Miscellaneous">Miscellaneous</option>
                                                        <option value="Library">Library</option>
                                                        <option value="Twitter Account">Twitter Account</option>
                                                        <option value="Community">Community</option>
                                                        <option value="Tool">Tool</option>
                                                        <option value="Blog">Blog</option>
                                                        <option value="Mentoring">Mentoring</option>
                                                        <option value="Course">Course</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </label>


                                                <label className="block mb-6">
                                                    <h3 className=" leading-snug mt-5 font-bold mb-1">Tags  <span className='text-xs'>(separated with &apos;;&apos;)</span></h3>
                                                    <textarea
                                                        name="tags"
                                                        className=" block w-full mt-1 pl-1 border-gray-300 rounded-md text-teal-600 shadow-sm focus:border-gray-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                                                        rows={1} placeholder="Data science;Dataviz"
                                                        value={tags} onChange={handleChange}
                                                    ></textarea>
                                                </label>

                                                <p> Once submitted, your resource will be reviewed before being published</p>
                                                <div className='pt-6'>
                                                    <button
                                                        type="submit"
                                                        className="h-10 px-5 bg-teal-500 text-white rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-teal-600 "
                                                        onClick={handleSubmit}
                                                    >
                                                        <span>Add your resource</span>
                                                    </button>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                    <div className="text-center w-full bg-slate-900 hidden lg:block">
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