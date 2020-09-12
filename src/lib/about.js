import fetch from 'isomorphic-unfetch';
import remark from 'remark';
import html from 'remark-html';
import { config } from '../config';

export async function getPageSlugs() {
  const response = await fetch(`${config.api}/pages`, {
    method: 'GET',
  });

  const json = await response.json();

  return json.map(({ slug }) => ({
    params: {
      slug,
    },
  }));
}

export async function getPagesData(slug) {
  const response = await fetch(`${config.api}/pages?slug=${slug}`, {
    method: 'GET',
  });

  const [page] = await response.json();

  const processedContent = await remark().use(html).process(page.description);

  const contentHtml = processedContent.toString();

  return {
    ...page,
    description: contentHtml,
  };
}

export async function getSortedPagesData() {
  const response = await fetch(`${config.api}/pages`, {
    method: 'GET',
  });

  const pagesData = await response.json();

  return pagesData.sort((a, b) => a.order - b.order);
}
