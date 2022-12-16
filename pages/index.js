import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import SubCategories from '../components/table/subcategories'
import SubCategoriesProducts from '../components/item/products'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>CustomAnalytic</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className='row'>
          <div className='col-lg-5 col-md-6 col-sm-12'>
            <div className={styles.container} style={{width:"100%", height:"90vh"}}>
              <SubCategories/>
            </div>
          </div>
          <div className='col-lg-7 col-md-6 col-sm-12'>
            <div className={styles.container} style={{width:"100%", height:"90vh"}}>
              <SubCategoriesProducts/>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
