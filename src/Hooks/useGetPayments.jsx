import { useQuery } from "@tanstack/react-query"
import useAxios from "./useAxios"


const useGetPayments = () => {
  const axioSecure = useAxios();
  const {data:payments=[]} = useQuery({
    queryKey: ['payments'],
    queryFn: async() => {
      const res = await axioSecure.get('/getpayments')
      return res.data;
    }
  })
  return payments;
}

export default useGetPayments