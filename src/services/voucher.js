import { request } from '../Utils/request';
import { ORDER_SERVICE } from '../Utils/constants';
export async function getDataVoucher() {
  return await request(`${ORDER_SERVICE}/vouchers?onlyActive=true`);
}

export async function addVoucher(payload) {
  return request(`${ORDER_SERVICE}/vouchers`, {
    method: 'POST',
    data: payload,
  });
}

export async function editVoucher(payload) {
  //console.log(JSON.stringify(payload))
  return request(`${ORDER_SERVICE}/vouchers`, {
    method: 'PUT',
    data: JSON.stringify(payload),
  });
}

export async function deleteVoucher(payload) {
  return request(`${ORDER_SERVICE}/vouchers/` + payload.voucherId, {
    method: 'DELETE',
  });
}
