import { request } from '../Utils/request';
export async function getDataBrand() {
  return await request(`/api/brands?onlyActive=true`);
}

export async function addDataBrand(payload) {
  return await request(`/api/brands`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
export async function delDataBrand(payload) {
  return await request(`/api/brands/${payload}`, {
    method: 'DELETE',
  });
}
export async function updateDataBrand(payload) {
 
  return await request(`/api/brands`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
