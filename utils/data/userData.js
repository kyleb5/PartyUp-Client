import { clientCredentials } from '../client';

const getUserFromFBKey = (id) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/user?fbKey=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export default getUserFromFBKey;
