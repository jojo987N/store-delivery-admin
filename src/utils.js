import CryptoJS from "crypto-js";
import {
  getCategories,
  getEarnings,
  getFoods,
  getOrdersFromFirebase,
  getStoresFromFirebase,
  getUsersFromFirebase,
} from "./firebase";

export const encryptData = (data) =>
  CryptoJS.AES.encrypt(
    JSON.stringify(data),
    "6d09g496-kcdf-11ea-a3c1-0282ac192345"
  ).toString();

export const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(
    ciphertext,
    "6d09g496-kcdf-11ea-a3c1-0282ac192345"
  );
  try {
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    return null;
  }
};

export const getData = (type) => {
  switch (type) {
    case "products":
      return getFoods();
      break;
    case "transactions":
      return getOrdersFromFirebase().then((orders) =>
        orders.filter((order) => order.status === "Completed")
      );
      break;
    case "orders":
      return getOrdersFromFirebase();
      break;
    case "drivers":
      return getUsersFromFirebase().then((users) =>
        users.filter((user) => user.Role === "driver")
      );
      break;
    case "stores":
      return getStoresFromFirebase();
      break;
    case "categories":
      return getCategories();
      break;
    case "earnings":
      return getEarnings();
      break;
    default:
      return getUsersFromFirebase();
  }
};
