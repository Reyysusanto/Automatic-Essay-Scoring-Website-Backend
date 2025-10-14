export const paginationQuery = (page?: number, pagination = true) => {
  return pagination ? { page: page || 1 } : { pagination: false };
};
