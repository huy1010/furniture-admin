export const DEFAULT_AVATAR =
  'https://res.cloudinary.com/dthfkshzd/image/upload/v1652983803/125366266-user_cas0im.webp';
export const EMPTY_IMAGE =
  'https://res.cloudinary.com/dthfkshzd/image/upload/v1653105979/images_azl3gh.png';
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
export function toDate(value) {
  return value.substring(0, 10);
}
export function moneyConverter(value) {
  let dollarUSLocale = Intl.NumberFormat('en-US');
  return dollarUSLocale.format(value);
}
