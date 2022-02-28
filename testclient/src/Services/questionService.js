import configData from "../config.json";
import axios from "axios";
const path = configData.server.path;

export const saveQuestion = async (question) => {
  try {
    console.log(question);
    const response = await axios.post(`${path}/ManageQuestion`, question);
    return response.data;
  } catch (error) {
    return false;
  }
};
export const getQuestions = async () => {
  try {
    const response = await axios.post(`${path}/getQuestions`);
    return response.data;
  } catch (error) {
    return false;
  }
};