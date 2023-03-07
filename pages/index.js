import React from 'react'
import Container from '@/components/Container';
import Image from 'next/image'
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import { useState } from 'react'


export default function Home(props) {

  const [query, setQuery] = useState('');

  //Our search filter function
  const searchFilter = (array) => {
    return array.filter(
      (el) => el.title.toLowerCase().includes(query) || el.description.toLowerCase().includes(query)
    )
  }

  //Applying our search filter function to our array of countries recieved from the API
  const filtered = searchFilter(props.product_details)

  //Handling the input on our search bar
  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  return (<>
    <Container>
      <Navbar />
      <div className="flex flex-col justify-center items-center max-w-2xl border-gray-700 mx-auto pb-16">
        <div className="flex flex-col-reverse sm:flex-row items-center text-center">
          <div className="flex flex-col" >
            <h1 className="h1 text-5xl mb-2 bg-gradient-to-r bg-clip-text  text-center text-transparent  from-teal-500 via-teal-600 to-blue-600 animate-text pb-1" >
              All about data
            </h1>
            <h2 className="text-gray-400 mb-4 ">
              Best data resources on internet
              <br />For all data enthusiasts
            </h2>
            <div className='w-full m-auto mt-5 relative flex flex-col md:flex-row justify-between items-start md:items-center gap-5 md:gap-0'>
              <div className="absolute inset-y-0 flex items-center justify-center rounded-full pointer-events-none w-7 h-7 left-2 top-2.5 ">
                <svg viewBox="0 0 20 20" width="1.2em" height="1.2em" className="w-4 h-4 text-primary" aria-hidden="true">
                  <path fill="currentColor" fillRule="evenodd" d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8ZM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8Z" clipRule="evenodd">
                  </path>
                </svg>
              </div>
              <input onChange={handleChange} aria-label="Search" type="search" name="search" id="search" className="block w-full p-3 pl-12 text-base leading-6 text-teal-600 placeholder-gray-400 transition duration-150 ease-in-out border-none appearance-none bg-gray-200 focus:outline-none focus:ring-0" placeholder="Search among all resources" />
            </div>
          </div>
        </div>
      </div>

      <div id="project" className="" data-aos="fade-up">
        <div id="categories" className="content-center flex justify-center items-center">
          <p className="text-gray-200 mr-4 ">Categories:</p>
          {props.categories.map((category) => (
            <Link key={uuidv4()} href={`/category/${category}`}>
              <span className="inline-flex px-3 mr-2 py-1 rounded-full text-sm font-semibold text-gray-100 text-center bg-teal-600">{category}</span>
            </Link>
          ))}
        </div>

        <section className="bg-gray-900 py-10 px-12">

          {/* Content */}
          <div key={uuidv4()} className="grid md:grid-cols-4  sm:grid-cols-3 gap-4">
            {/* Card */}
            {filtered.map((product, index) => (
              < div key={uuidv4()} className=" bg-white shadow-lg rounded-sm border border-slate-200 duration-300 hover:-translate-y-1" >

                <div key={uuidv4()} className="flex flex-col ">
                  {/* Image */}

                  <Link href={product.url_resource}  target="_blank">
                    <div className="relative">
                      <Image key={uuidv4()}
                        alt={product.description}
                        height={301}
                        width={226}
                        style={{ objectFit: "cover" }}
                        src={product.url_img ? product.url_img : "/images/no_image.png"} 
                        priority
                        className="rounded-t w-full h-32"
                        onError={(e) => {
                          e.target.src = "/images/no_image.png";
                        }} />
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
                  </Link>
                </div>
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

export const getServerSideProps = async () => {
  const { data: product_details } = await supabase.from("Resources").select("*").eq("status", "published");

  const categories = Array.from(new Set(product_details.flatMap((product) => product.categories.split(';')))); // Need to convert "Set" in an array

  return {
    props: {
      product_details,
      categories,
    },
  };
};