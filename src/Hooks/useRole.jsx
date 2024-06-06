import useAxios from './useAxios'
import useData from './useData';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
  const axiosSecure = useAxios();
  const {user} = useData();
  const {data:role=''} = useQuery({
    queryKey: ['role'],
    enabled: user != null,
    queryFn: async() => {
      const res = await axiosSecure.get(`/users?id=${user?.uid}`)
      return res.data?.role;
    }
  })

  return role;

}

export default useRole