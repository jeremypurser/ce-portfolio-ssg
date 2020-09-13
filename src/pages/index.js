import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPagesData } from '../lib/about';
import { getSortedCategoriesData } from '../lib/category';

export default function Home({ allPagesData, allCategoriesData }) {
  return (
    <Layout
      home={true}
      allPagesData={allPagesData}
      allCategoriesData={allCategoriesData}
    >
      <Head>
        <title>{siteTitle}</title>
      </Head>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPagesData = await getSortedPagesData();

  const allCategoriesData = await getSortedCategoriesData();

  console.log({ allCategoriesData });

  return {
    props: {
      allPagesData,
      allCategoriesData,
    },
  };
}
