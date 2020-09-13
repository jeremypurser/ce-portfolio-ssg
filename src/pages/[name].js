import Head from 'next/head';
import Layout from '../components/layout';
import { getSortedPagesData } from '../lib/about';
import {
  getCategoryData,
  getCategoryNames,
  getSortedCategoriesData,
} from '../lib/category';

export default function Category({
  categoryData,
  allPagesData,
  allCategoriesData,
}) {
  return (
    <Layout allPagesData={allPagesData} allCategoriesData={allCategoriesData}>
      <Head>{categoryData.name}</Head>
      <article>
        <h1>{categoryData.name}</h1>
        {categoryData.pieces.map(({ id, title }) => (
          <p key={id}>{title}</p>
        ))}
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getCategoryNames();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const categoryData = await getCategoryData(params.name);
  const allPagesData = await getSortedPagesData();
  const allCategoriesData = await getSortedCategoriesData();

  return {
    props: {
      categoryData,
      allPagesData,
      allCategoriesData,
    },
  };
}
