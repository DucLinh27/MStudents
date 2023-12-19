import axios from "../axios";

const getConfig = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/payment/config`
  );
  return res.data;
};

export { getConfig };
