import { request } from '../Utils/request';
import { parse } from 'querystring';
import { USER_SERVICE } from '../Utils/constants';
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export async function accountLogin(params) {
  var response = await request(`${USER_SERVICE}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
  if (response.content.role === 'USER') response.status = 400;
  return response;
}
