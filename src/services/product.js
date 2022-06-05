import { request } from '../Utils/request';
export async function getDataProduct() {
  return await request(`/api/products?onlyActive=true`);
}
export async function getProductDetail(payload) {
  console.log('cccc')
  return await request(`/api/products/${payload}`);
}
export function addProduct(payload) {
  
  return request(`/api/products`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
export function editProduct(payload) {
  return request(`/api/products`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
export function delProduct(payload) {
  return request(`/api/products/${payload}`, {
    method: 'DELETE',
  });
}
export function addVariant(payload) {

  return request(`/api/variants`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
export function editVariant(payload) {
  return request(`/api/variants`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
export function delVariant(payload) {
  return request(`/api/variants/${payload}`, {
    method: 'DELETE',
  });
}
