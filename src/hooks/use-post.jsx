import axios from "axios";
import { useUserContext } from "../Context/userContext";

export const usePost = () => {
  const { setUser, setError, setUserAndStore } = useUserContext();

  const postData = async (url, fData) => {
      const res = await axios.post(url, fData);

      if(res.data.error == "None") {
        setUser(res.data.data);
        setUserAndStore(res.data.data);
        setError(null);
        return true
      } else {
        setUser(null);
        setError(res.data.error);
        return false
      }
      
    }  

  return {postData}
}