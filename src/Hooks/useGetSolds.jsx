import useAxios from './useAxios'
import useData from './useData';
import { useQuery } from '@tanstack/react-query';

const useGetSolds = () => {
  const axiosSecure = useAxios();
  const {user} = useData();
  const {data:sellerSolds=[]} = useQuery({
    queryKey: ['sellerSolds'],
    enabled: user!= null,
    queryFn: async() => {
      const res = await axiosSecure.get(`/sold/${user?.uid}`);
      return res.data;
    }
  })
  return sellerSolds;
}

export default useGetSolds