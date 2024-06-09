import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useShop = () => {
  const axiosSecure = useAxios();

  const {data:shopItems = []} = useQuery({
    queryKey: ['allItems'],
    queryFn: async() => {
      const res = await axiosSecure.get(`/shop`);
      return res.data;
    }
  })
  return shopItems
}

export default useShop