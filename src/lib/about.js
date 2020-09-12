import fetch from 'isomorphic-unfetch';
import remark from 'remark';
import html from 'remark-html';
import { config } from '../config';

export async function getAllPageIds() {
  const response = await fetch(`${config.api}/pages`, {
    method: 'GET',
  });

  const json = await response.json();

  return json.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));
}

export async function getPagesData(id) {
  const response = await fetch(`${config.api}/pages/${id}`, {
    method: 'GET',
  });

  const json = await response.json();

  const processedContent = await remark().use(html).process(json.description);

  const contentHtml = processedContent.toString();

  return {
    ...json,
    description: contentHtml,
  };
}

export async function getSortedPagesData() {
  const response = await fetch(`${config.api}/pages`, {
    method: 'GET',
  });

  const pagesData = await response.json();

  const data = pagesData.map((page) => {
    return {
      id: page.id,
      name: page.name,
      order: page.order,
    };
  });

  return data.sort((a, b) => a.order - b.order);
}
