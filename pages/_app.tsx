import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script';
import { useEffect } from "react";
import AOS from 'aos'
import 'aos/dist/aos.css';

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <>
      <Script async defer data-website-id="92c2af7f-70aa-4eb2-aa5a-4292a52749ce" src="https://umami-analytics-m5q0vssrd-pclavelloux.vercel.app/umami.js"></Script>
      <Component {...pageProps} />
    </>
  )

}
