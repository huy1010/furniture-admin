import { request } from '../Utils/request';
import { PRODUCT_SERVICE } from '../Utils/constants';
export async function getCategoryList() {
  return await request(`${PRODUCT_SERVICE}/categories?onlyActive=true`);
}
export async function getAttributeList() {
  return await request(`${PRODUCT_SERVICE}/attributes`);
}
export function addCategory(payload) {
  return request(`${PRODUCT_SERVICE}/categories`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
export function editCategory(payload) {
  return request(`${PRODUCT_SERVICE}/categories`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
export function delCategory(payload) {
  return request(`${PRODUCT_SERVICE}/categories/${payload}`, {
    method: 'DELETE',
  });
}
