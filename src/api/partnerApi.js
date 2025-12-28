import axiosClient from "./axiosClient";

const partnerApi = {
  register(data) {
    const url = "/api/v1/partner-registrations";
    return axiosClient.post(url, data);
  },
};

export default partnerApi;

