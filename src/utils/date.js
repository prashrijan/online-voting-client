export const formatDate = (isoDateStr) => {
  if (!isoDateStr) return;

  const date = new Date(isoDateStr);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};
