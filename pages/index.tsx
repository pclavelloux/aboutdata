import React from 'react'
import Container from '../components/Container';
import Image from 'next/image'
import Link from 'next/link';


export default function home() {


  return (<>
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div className="flex flex-col-reverse sm:flex-row items-start">
          <div className="flex flex-col pr-8">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight text-teal-500 mb-1" data-aos="fade-up">
              Titre
            </h1>
            <h2 className="text-gray-700 dark:text-gray-200 mb-4">
              Sous titre
            </h2>
          </div>
        </div>
      </div>

      <div id="project">
        <h3 className="text-center font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
          lorem ipsum...
        </h3>

        <section className="bg-gray-100 dark:bg-gray-900 py-10 px-12">
          <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            Part
          </div>
        </section>

      </div>



      <div className='text-center text-gray-400'></div>
    </Container >
  </>
  )
}
