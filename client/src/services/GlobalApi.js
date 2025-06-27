import axios from "axios";

const BASE_URL = "https://bright-horizon-strapi-1.onrender.com/api";

const API_KEY =
  "3b58e190ce92e843c6141f306a11e224111f806c957dc776f55ec1f599b59902b125aac73a667c5c4c68ab93fea3e61ab1fd9a00a08d77c2b51fa675f1dc9fb2d7897edc7dd0d8a436329e49b3a027c44cdd0a68aadaf65f5e7beabec882267ad389afb13239e49f783bde3684d27dd8e469d6f0c5656920bc98883fd4626d21";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer " + API_KEY,
  },
});

const getBlog = () => axiosInstance.get("/blogs?populate=*");
const getGallery = ()=>axiosInstance.get("/galleries?populate=*")

export default {
  getBlog,
  getGallery
};
