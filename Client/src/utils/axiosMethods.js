import axios from "axios";

export async function sendData(url, body, options) {
  try {
    const res = await axios.post(`${url}`, body, options);
    return res.data;
  } catch (err) {
    // console.log(err.response.data);
    return err.response.data;
  }
}

export async function getData(url, options) {
  try {
    const data = await axios.get(`${url}`, options);
    return data;
  } catch (err) {
    // console.log(err.response.data);
    return err.response.data;
  }
}
