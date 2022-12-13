import { instance } from "../../../constant/axios/Axios";
import Swal from "sweetalert2";

export const addToWishlist = (movieId, signal) => {
  return instance
    .post(`/wishlists/add/${movieId}`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      signal,
    })
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Done",
          text: "Successfully Added To My List.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      return res;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Failed",
          text: "Please sign in to use this feature.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
};

export const getUserDetail = async () => {
  return instance.get(`/user/detail`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};
