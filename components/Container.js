import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Footer from './Footer';


export default function Container(props) {
    const { children, ...customMeta } = props;
    const router = useRouter();

    const meta = {
        title: 'TITLE',
        description: ``,
        image: '',
        type: 'website',
        ...customMeta
    };

    return ( //TODO change parameters
        <div className="bg-gray-50 dark:bg-gray-900">
            <Head>
                <title>{meta.title}</title>
                <meta name="robots" content="follow, index" />
                <meta content={meta.description} name="description" />
                <meta property="og:type" content={meta.type} />
                <meta property="og:site_name" content="Pauline" />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:image" content={meta.image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@pauline_cx" />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:image" content={meta.image} />
                {meta.date && (
                    <meta property="article:published_time" content={meta.date} />
                )}
            </Head>
            <Navbar/>
            
            <main id="main"  className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900">
                {children}
            </main>
            <Footer/>
        </div>
    )
}