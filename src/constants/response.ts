/* eslint-disable @typescript-eslint/no-explicit-any */
const collection = (data: any, offset?: string, per_page?: string) => {
  const response = {
    type: 'collection',
    error: null,
    error_human: null,
    data: data,
    offset: offset,
    per_page: per_page,
  };
  return response;
};

const single = (data: any) => {
  const response = {
    type: 'single',
    error: null,
    error_human: null,
    data: { ...data },
  };
  return response;
};

export default {
  collection,
  single,
};
