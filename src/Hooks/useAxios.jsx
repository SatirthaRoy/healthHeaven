import axios from 'axios'

const axiosSecure = axios.create({
  // baseURL: 'http://localhost:5000'
  baseURL: 'https://healthheaven-satirtha-roys-projects.vercel.app'
})

const useAxios = () => {
  return axiosSecure;
}

export default useAxios