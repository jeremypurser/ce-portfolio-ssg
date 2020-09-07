import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPagesData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';

export default function Home({ allPagesData }) {
  return (
    <Layout home={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>…</section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPagesData.map(({ id, name }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{name}</a>
              </Link>
              <br />
              {/* <small className={utilStyles.lightText}> */}
              {/* <Date dateString={date} /> */}
              {/* </small> */}
            </li>
          ))}
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
