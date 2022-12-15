import { request } from '../Utils/request';
import { USER_SERVICE } from '../Utils/constants';
export async function getCustomers() {
  return await request(`${USER_SERVICE}/customers`);
}
export async function getStaffs() {
  return await request(`${USER_SERVICE}/users`);
}
export function addUser(payload) {
  return request(`${USER_SERVICE}/add-users`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
export function delAccount(payload) {
  return request(`${USER_SERVICE}/users/${payload}`, {
    method: 'DELETE',
  });
}
export function blockAccount(payload) {
  return request(`${USER_SERVICE}/users/block-user`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
