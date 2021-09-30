import fetch from 'isomorphic-unfetch';
import { config } from '../config';

export async function getCategoryNames() {
  const response = await fetch(`${config.api}/categories`, {
    method: 'GET',
  });

  const json = await response.json();

  return json.map(({ name }) => ({
    params: {
      name,
    },
  }));
}

export async function getSortedCategoriesData() {
  const response = await fetch(`${config.api}/categories`, {
    method: 'GET',
  });

  const json = await response.json();

  return json.sort((a, b) => a.id - b.id);
}

export async function getCategoryData(name) {
  const response = await fetch(`${config.api}/categories?name=${name}`, {
    method: 'GET',
  });

  const [json] = await response.json();

  return {
    ...json,
    pieces: json.pieces.sort((a, b) => a.order - b.order),
  };
}
