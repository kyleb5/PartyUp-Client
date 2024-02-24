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
      .then((data) => resolve(Object.values(data)))
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

export { getGames, getSingleGame, getGameGroups };
