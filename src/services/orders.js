import { request } from '../Utils/request';
import { ORDER_SERVICE } from '../Utils/constants';
export async function getOrderList() {
  return await request(`${ORDER_SERVICE}/orders`);
}
export function addOrder(payload) {
  return request(``, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
export function editOrder(payload) {
  return request(`${ORDER_SERVICE}/orders/change-order-status`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
export function delOrder(payload) {
  return request(`${ORDER_SERVICE}/${payload}`, {
    method: 'DELETE',
  });
}
