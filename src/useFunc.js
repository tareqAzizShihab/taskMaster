function convertDate(
  date = "AAA AAA 00 0000 00:00:00 GMT+0600 (Bangladesh Standard Time)"
) {
  const dateString = date.toString();
  return `${dateString.slice(8, 10)} ${dateString.slice(
    4,
    7
  )}, ${dateString.slice(11, 15)}`;
}

export default convertDate;
