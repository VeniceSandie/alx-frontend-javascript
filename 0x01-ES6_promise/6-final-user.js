import { signUpUser } from './4-user-promise';
import { uploadPhoto } from './5-photo-reject';

export function handleProfileSignup(firstName, lastName, fileName) {
  const signUpPromise = signUpUser(firstName, lastName);
  const uploadPromise = uploadPhoto(fileName);

  return Promise.allSettled([signUpPromise, uploadPromise])
    .then((results) => {
      return results.map((result) => {
        if (result.status === 'fulfilled') {
          return { status: 'fulfilled', value: result.value };
        } else {
          return { status: 'rejected', reason: result.reason };
        }
      });
    })
    .catch((error) => {
      console.error('Error during profile signup:', error);
      throw error;
    });
}
