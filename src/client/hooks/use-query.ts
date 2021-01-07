const useQuery = <T>(): T => {
  const { href } = location;
  const search: string = href.split('?')[1] ?? '';
  const params: Array<string> = search.split('&');
  const res: T | any = {};

  let paramArr: Array<string> = [];
  
  params.forEach((param: string) => {
    paramArr = param.split('=');
    res[paramArr[0]] = decodeURIComponent(paramArr[1]);
  });

  return res;
};

export default useQuery;