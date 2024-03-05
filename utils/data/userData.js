/* eslint-disable implicit-arrow-linebreak */
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
      .then((data) => {
        if (Array.isArray(data)) {
          resolve(data[0]);
        } else {
          resolve(data);
        }
      })
      .catch(reject);
  });

const getSingleUser = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateProfile = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/user/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getUserFromFBKey, getSingleUser, updateProfile };
