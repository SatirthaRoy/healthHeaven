import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios"


const useGetQueries = () => {
  const axiosSecure = useAxios();
  const {data:queries=[]} = useQuery({
    queryKey: ['myQueries'],
    queryFn: async() => {
      const res = await axiosSecure.get(`/queries`);
      return res.data;
    }
  })
  return queries;
}

export default useGetQueries