import axios from "axios";
import { useJoinedClassesContext } from "../Context/joinedClassContext";

export const useJoinedClassPost = () => {

  const { setJoinedClasses, setError, setJoinedClassesAndStore } = useJoinedClassesContext();


  const postData = async (url, fData) => {
      const res = await axios.post(url, fData);

      if(res.data.error == "None"){
        setJoinedClasses(res.data.data);
        setJoinedClassesAndStore(res.data.data);
        setError(null);
        return true;
      } else {
        setError(res.data.error);
        return false;
      }
    }  

  return {postData}
}