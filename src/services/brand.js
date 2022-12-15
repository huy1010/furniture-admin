import { request } from '../Utils/request';
import { PRODUCT_SERVICE } from '../Utils/constants';
export async function getDataBrand() {
  return await request(`${PRODUCT_SERVICE}/brands?onlyActive=true`);
}

export async function addDataBrand(payload) {
  return await request(`${PRODUCT_SERVICE}/brands`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
export async function delDataBrand(payload) {
  return await request(`${PRODUCT_SERVICE}/brands/${payload}`, {
    method: 'DELETE',
  });
}
export async function updateDataBrand(payload) {
  return await request(`${PRODUCT_SERVICE}/brands`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
