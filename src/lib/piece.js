import fetch from 'isomorphic-unfetch';
import { config } from '../config';

export async function getPieceIds() {
  const response = await fetch(`${config.api}/pieces`, {
    method: 'GET',
  });

  const json = await response.json();

  return json.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));
}

export async function getPieceData(id) {
  const response = await fetch(`${config.api}/pieces/${id}`);

  const json = await response.json();

  return json;
}
