import axios from "axios";
import queryString from "query-string";

export const request = async (opts) => {
  if (!opts.url) {
    throw new Error("url is required");
  }

  opts.baseURL = process.env.REACT_APP_API_URL;
  opts.method = opts.method || "get";

  opts.paramsSerializer = (params) => {
    return queryString.stringify(params);
  };

  try {
    const res = await axios(opts);

    return res.data;
  } catch (error) {
    console.error(">>>>>>error", error);
    return { error };
  }
};

export const get = (url, params) => request({ url, params });
