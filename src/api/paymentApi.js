import axiosClient from "./axiosClient";

const paymentApi = {
  // PayOS
  createPayOSPayment: (data) => {
    const url = "/payment/payos";
    return axiosClient.post(url, data);
  },

  // Get payment details
  getPaymentDetails: (orderId) => {
    const url = `/payment/${orderId}`;
    return axiosClient.get(url);
  },
};

export default paymentApi;
