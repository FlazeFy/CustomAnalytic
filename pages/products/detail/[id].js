import Head from 'next/head'
import styles from '../../../styles/Home.module.css'
import Navbar from '../../../components/navbar/navbar'
import { useRouter } from 'next/router'
import LastProductSales from '../../../components/item/lastTransaction'

const ProductById = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <>
            <Head>
                <title>CustomAnalytic</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Navbar active={"products"}/>
                <div className='pt-5'>
                    <LastProductSales id={id}/>
                </div>
            </main>
        </>
    )
}

export default ProductById;
