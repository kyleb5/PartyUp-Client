/* eslint-disable object-curly-newline */
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

const getGroups = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/post`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getUserInGroup = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/groupmember?post=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createGroupMember = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/groupmember`, {
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

const deleteGroupMember = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/groupmember/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateGroup = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/post/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteGroup = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/post/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getSingleGroup, getGroups, getUserInGroup, createGroupMember, updateGroup, deleteGroup, deleteGroupMember };
