import axios from "axios";
import { token } from "../stores/token";
import { get } from "svelte/store";

const useRecipeApi = () => {
  const tokenValue = get(token);

  return axios.create({
    baseURL: "/api",
    headers: {
      Authorization: tokenValue,
    },
  });
};

export default useRecipeApi;
