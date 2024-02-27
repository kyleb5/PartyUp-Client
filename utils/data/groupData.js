/* eslint-disable implicit-arrow-linebreak */
import { clientCredentials } from '../client';

const getSingleGroup = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/post/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export default getSingleGroup;
