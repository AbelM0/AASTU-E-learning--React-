import axios from "axios";
import { useCreatedClassesContext } from "../Context/classContext";

export const useCreateClassPost = () => {

  const { setCreatedClasses, setError, setCreatedClassesAndStore  } = useCreatedClassesContext();


  const postData = async (url, fData) => {
      const res = await axios.post(url, fData);

      if(res.data.error == "None"){
        setCreatedClasses(res.data.data);
        setCreatedClassesAndStore(res.data.data);
        setError(null);
        return true;
      } else {
        setError(res.data.error);
        return false;
      }
      
    }  

  return {postData}
}