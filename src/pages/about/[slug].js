import Head from 'next/head';
import Layout from '../../components/layout';
import {
  getPagesData,
  getPageSlugs,
  getSortedPagesData,
} from '../../lib/about';
import { getSortedCategoriesData } from '../../lib/category';
import utilStyles from '../../styles/utils.module.css';

export default function Page({ pageData, allPagesData, allCategoriesData }) {
  return (
    <Layout
      page="about"
      allPagesData={allPagesData}
      allCategoriesData={allCategoriesData}
    >
      <Head>
        <title>{pageData.name}</title>
      </Head>
      <article className={utilStyles.copy}>
        <h2>{pageData.name}</h2>
        <div dangerouslySetInnerHTML={{ __html: pageData.description }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getPageSlugs();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pageData = await getPagesData(params.slug);
  const allPagesData = await getSortedPagesData();
  const allCategoriesData = await getSortedCategoriesData();

  return {
    props: {
      pageData,
      allPagesData,
      allCategoriesData,
    },
  };
}
