import { useQuery } from '@tanstack/react-query';
import useData from './useData';
import useAxios from './useAxios';

const useShop = () => {

  const {user} = useData();
  const axiosSecure = useAxios();

  const {data:shopItems = []} = useQuery({
    queryKey: ['allItems'],
    enabled: user != null,
    queryFn: async() => {
      const res = await axiosSecure.get(`/shop`);
      return res.data;
    }
  })
  console.log(shopItems);
  return shopItems
}

export default useShop