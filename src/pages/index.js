import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPagesData } from '../lib/about';
import utilStyles from '../styles/utils.module.css';

export default function Home({ allPagesData }) {
  return (
    <Layout home={true} allPagesData={allPagesData}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>…</section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          <li>Placeholder</li>
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPagesData = await getSortedPagesData();

  return {
    props: {
      allPagesData,
    },
  };
}
