import { request } from '../Utils/request';
import { USER_SERVICE } from '../Utils/constants';
export async function getProfile() {
  return await request(`${USER_SERVICE}/profile/me`);
}
export async function changePassWord(payload) {
  return request(`${USER_SERVICE}/profile/me/change-password`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
export async function updateProfile(payload) {
  return request(`${USER_SERVICE}/profile/me`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
