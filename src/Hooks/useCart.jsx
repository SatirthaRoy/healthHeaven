import { useQuery } from '@tanstack/react-query'
import useData from './useData'
import useAxios from './useAxios';

const useCart = () => {
  const {user} = useData();
  const axiosSecure = useAxios();

  const {data:cart=[], refetch} = useQuery({
    queryKey: ['cart'],
    enabled: user != null,
    queryFn: async() => {
      const res = await axiosSecure.get(`/getcart/${user?.uid}`);
      return res.data;
    }
  })

  return [cart, refetch];
}

export default useCart