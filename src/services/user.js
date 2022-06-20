import { request } from '../Utils/request';
export async function getCustomers() {
  return await request(`/api/customers`);
}
export async function getStaffs() {
    return await request(`/api/users`);
  }
export function addUser(payload) {
  return request(`/api/users`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
export function delAccount(payload) {
  return request(`/api/users/${payload}`, {
    method: 'DELETE',
  });
}
export function blockAccount(payload) {
  return request(`/api/users/block-user`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}
