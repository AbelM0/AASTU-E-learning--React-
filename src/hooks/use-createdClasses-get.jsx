import axios from "axios";
import { useCreatedClassesContext } from "../Context/classContext";

export const useCreateClassGet = () => {

  const { setCreatedClasses, setError, setCreatedClassesAndStore } = useCreatedClassesContext();


  const getData = async (url, params) => {
      const res = await axios.get(url, { params });

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

  return {getData}
}