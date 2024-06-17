import axios from "axios";
import { useJoinedClassesContext } from "../Context/joinedClassContext";

export const useJoinedClassGet = () => {

  const { setJoinedClasses, setError, setJoinedClassesAndStore } = useJoinedClassesContext();


  const getJoinedData = async (url, params) => {
      const res = await axios.get(url, { params });

      if(res.data.error == "None"){
        
        if(res.data.data != []){
          setJoinedClasses(res.data.data);
          setJoinedClassesAndStore(res.data.data);
        } 
        setError(null);
        return true;
      } else {
        setError(res.data.error);
        return false;
      }
      
    }  

  return {getJoinedData}
}