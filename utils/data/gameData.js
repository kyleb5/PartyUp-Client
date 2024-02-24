/* eslint-disable implicit-arrow-linebreak */
import { clientCredentials } from '../client';

const getGames = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/games`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getSingleGame = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/games/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getGameGroups = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/post?game=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createGroupPost = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// eslint-disable-next-line object-curly-newline
export { getGames, getSingleGame, getGameGroups, createGroupPost };
