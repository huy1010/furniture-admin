import { request } from '../Utils/request';
import { PRODUCT_SERVICE } from '../Utils/constants';
export async function getDataProduct() {
  return await request(`${PRODUCT_SERVICE}/products?onlyActive=true`);
}
export async function getProductDetail(payload) {
  console.log('cccc');
  return await request(`${PRODUCT_SERVICE}/products/${payload}`);
}
export function addProduct(payload) {
  return request(`${PRODUCT_SERVICE}/products`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
export function editProduct(payload) {
  return request(`${PRODUCT_SERVICE}/products`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
export function delProduct(payload) {
  return request(`${PRODUCT_SERVICE}/products/${payload}`, {
    method: 'DELETE',
  });
}
export function addVariant(payload) {
  return request(`${PRODUCT_SERVICE}/variants`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
export function editVariant(payload) {
  return request(`${PRODUCT_SERVICE}/variants`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
export function delVariant(payload) {
  return request(`${PRODUCT_SERVICE}/variants/${payload}`, {
    method: 'DELETE',
  });
}
