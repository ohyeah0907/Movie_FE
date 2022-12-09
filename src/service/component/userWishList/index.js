import { instance } from "../../../constant/axios/Axios";
import Swal from "sweetalert2";

export const addToWishlist = (movieId, signal) => {
  return instance.post(`/wishlists/add/${movieId}`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    signal,
  });
};

export const getUserDetail = async () => {
  return instance.get(`/user/detail`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};
