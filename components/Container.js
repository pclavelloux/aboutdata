import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Footer from './Footer';


export default function Container(props) {
    const { children, ...customMeta } = props;
    const router = useRouter();

    const meta = {
        title: 'Best data resources',
        description: `Best blogs, twitter account, courses etc about data (data science, machine learning, data analysis...)`,
        image: '',
        type: 'website',
        ...customMeta
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Head>
                <title>{meta.title}</title>
                <meta name="robots" content="follow, index" />
                <meta content={meta.description} name="description" />
                <meta property="og:type" content={meta.type} />
                <meta property="og:site_name" content="About Data" />
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

            <main id="main" className="flex flex-col justify-center bg-gray-50 dark:bg-gray-900 min-h-screen">
                {children}
            </main>

            <Footer />
        </div>
    )
}