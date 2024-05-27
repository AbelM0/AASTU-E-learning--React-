import axios from "axios";
import { useCreatedClassesContext } from "../Context/classContext";

export const useClassPatch = () => {

  const { setCreatedClasses, setError, setCreatedClassesAndStore  } = useCreatedClassesContext();


  const patchData = async (url, fData) => {
      const res = await axios.patch(url, fData);

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

  return {patchData}
}