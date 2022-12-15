import { request } from '../Utils/request';
import { IMPORT_SERVICE, ORDER_SERVICE } from '../Utils/constants';
export async function getBillRevenueReport(payload) {
  return await request(
    `${ORDER_SERVICE}/orders/report?compression=day&end=` + payload.end + `&start=` + payload.start,
  );
}

export async function getImporterReport(payload) {
  return await request(
    `${IMPORT_SERVICE}/imports/report?compression=day&end=` +
      payload.end +
      `&start=` +
      payload.start,
  );
}

export async function getBestSeller() {
  return await request(`${ORDER_SERVICE}/orders/best-seller`);
}

export async function getRevenue() {
  return await request(`${ORDER_SERVICE}/orders/revenue`);
}

export async function getTotalCost() {
  return await request(`${IMPORT_SERVICE}/imports/total-cost`);
}
