import axios, { AxiosResponse } from "axios";

export const getAxiosRequestBuilder = async (url: string, config = {}): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error(`Error in getAxiosRequestBuilder: ${error}`);
    throw error;
  }
};

export const postAxiosRequestBuilder = async (url: string, data: any, config = {}): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(url, data, config);
    return response.data;
  } catch (error) {
    console.error(`Error in postAxiosRequestBuilder: ${error}`);
    throw error;
  }
};
