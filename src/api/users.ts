export const getUsersFromServer = () => {
  return fetch('../public/api/authUsers.json')
    .then(response => response.json());
};
