import axios from "axios";

export default axios.create({
  baseURL: `https://public-transit-route-default-rtdb.asia-southeast1.firebasedatabase.app/`,
});
