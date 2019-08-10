/*
Action Functions For Logout ,Register and Login,
I am storing te user data via localstorage
ad if logout occur I am clearing not just the userdata but also the cart data.
*/

import axios from "axios";
import moment from "moment";

const User = UserData => {
  return {
    type: "setUser",
    UserData
  };
};

export const Logout = () => {
  localStorage.removeItem("shopMax_UserData");
  localStorage.removeItem("shopmax_LoginXpire");
  localStorage.removeItem("cart_id");
  return {
    type: "Logout"
  };
};

export const setUser = () => {
  const UserData = localStorage.getItem("shopMax_UserData");
  const ParsedUserData = JSON.parse(UserData);
  const LoginXpire = localStorage.getItem("shopmax_LoginXpire");
  const isAccessToken = moment().valueOf() >= LoginXpire;

  return dispatch => {
    if (ParsedUserData && !isAccessToken) {
      dispatch(User(ParsedUserData));
    }
    if (ParsedUserData && isAccessToken) {
      localStorage.removeItem("shopMax_UserData");
      localStorage.removeItem("shopmax_LoginXpire");
      return true;
    }
  };
};

export const startUserLogin = ({ email, password }) => {
  return dispatch => {
    return axios({
      method: "post",
      url: "https://backendapi.turing.com/customers/login",
      data: {
        email,
        password
      }
    })
      .then(({ data }) => {
        const user = {
          customer: data.user,
          ...data
        };
        localStorage.setItem("shopMax_UserData", JSON.stringify(user));
        localStorage.setItem(
          "shopmax_LoginXpire",
          moment()
            .hours(24)
            .valueOf()
        );
        dispatch(User(user));
        return true;
      })
      .catch(error => {
        throw error;
      });
  };
};

export const startUserRegister = ({ name, email, password }) => {
  return dispatch => {
    return axios({
      method: "post",
      url: "https://backendapi.turing.com/customers",
      data: {
        name,
        email,
        password
      }
    })
      .then(({ data }) => {
        localStorage.setItem("shopMax_UserData", JSON.stringify(data));
        localStorage.setItem(
          "shopmax_LoginXpire",
          moment()
            .hours(24)
            .valueOf()
        );
        dispatch(User(data));
        return true;
      })
      .catch(error => {
        throw error;
      });
  };
};
