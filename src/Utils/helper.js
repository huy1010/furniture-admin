export const DEFAULT_AVATAR =
  'https://res.cloudinary.com/dthfkshzd/image/upload/v1652983803/125366266-user_cas0im.webp';
export const EMPTY_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDF9695aEHL20tZNMzJ26nIGr5AYMKr_eaoxXWtDkngU8M8KXhqPQXkhyamMWJ1mvbeYU&usqp=CAU'
export const getdateTime = () => {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  if (month.toString().length == 1) {
    month = '0' + month;
  }
  if (day.toString().length == 1) {
    day = '0' + day;
  }
  var dateTime = day + '-' + month + '-' + year;
  return dateTime;
};
export function moneyConverter(value) {
  let dollarUSLocale = Intl.NumberFormat('en-US');
  return dollarUSLocale.format(value);
}
export function toDate(value) {
  return value.substring(0, 10);
}
export function modifyString(str) {
  if (str === undefined) return undefined;
  str = str.replace(/\s/g, '');
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}
export function setDataSource(source) {
  var result = source.map(item => {
    item.options.forEach(option => {
      item[modifyString(option.optionName)] = option.optionValue;
    });
    return item;
  });
  console.log(result);
  return result;
}
export function getAddress(address) {
  if (address == null) return;
  let province, district, ward, street;
  const addressDetail = address.split('|');
  addressDetail.forEach(item => {
    if (item.includes('Province')) {
      province = item.substr(9, item.length);
    }
    if (item.includes('District')) {
      district = item.substr(9, item.length);
    }
    if (item.includes('Ward')) {
      ward = item.substr(5, item.length);
    }
    if (item.includes('Address')) {
      street = item.substr(8, item.length);
    }
  });
  return province + ', ' + district + ', ' + ward + ', ' + street;
}
export function getWithExpiry() {
  const itemStr = localStorage.getItem('token');
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  if (item?.expiry === undefined) return null;
  if (item?.value === undefined) return null;
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem('token');
    return null;
  }
  return item.value;
}
