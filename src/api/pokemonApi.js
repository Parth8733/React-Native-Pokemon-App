import axios from "axios";
import { HOST_URL } from "@env";
export default axios.create({
  baseURL: `${HOST_URL}`,
});
