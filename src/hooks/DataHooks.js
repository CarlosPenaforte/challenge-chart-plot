import { useContext } from "react";
import { Context } from "../providers/Provider";

//Creates a hook for having an easier data management;
const useData = () => {

  const { dataState, getData } = useContext(Context);

  return { dataState, getData };
}

export default useData