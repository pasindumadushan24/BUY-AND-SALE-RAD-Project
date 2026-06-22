import api from "./api";

export const createVehicle = (data: FormData) => {
  return api.post("/vehicles", data);
};


export const getVehicles = () => {
  return api.get("/vehicles");
};