import { request } from '../Utils/request';

export async function getBillRevenueReport(payload) {
  return await request(
    `/api/report/orders?compression=day&end=` + payload.end + `&start=` + payload.start,
  );
}

export async function getImporterReport(payload) {
  return await request(
    `/api/report/import?compression=day&end=` + payload.end + `&start=` + payload.start,
  );
}

export async function getBestSeller() {
  return await request(`/api/report/orders/best-seller`);
}

export async function getRevenue() {
  return await request(`/api/report/orders/revenue`);
}

export async function getTotalCost() {
  return await request(`/api/report/import/total-cost`);
}
