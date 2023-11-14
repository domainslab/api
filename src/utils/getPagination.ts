export const getPagination =(page: number, size = 10):{from: number, to: number} => {
  const from = page * size - size;
  const to = from + size - 1 ;
  return { from, to };
};
