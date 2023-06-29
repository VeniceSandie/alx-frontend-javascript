import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  return Promise.allSettled([
    signUpUser(firstName, lastName),
    uploadPhoto(fileName),
  ])
    .then((results) => {
      const arr = [];
      for (const result of results) {
        if (result.status === 'fulfilled') {
          arr.push({ status: 'fulfilled', value: result.value });
        } else {
          arr.push({ status: 'rejected', reason: result.reason });
        }
      }
      return arr;
    })
    .catch((error) => {
      console.error('Error during profile signup:', error);
      throw error;
    });
}
