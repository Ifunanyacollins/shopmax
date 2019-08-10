/*
This are actions for fetching products from the server and the  core 
function is GetProducts,which dispatch an array of the product to the store.
*/

import axios from "axios";

const GetProducts = (products = []) => ({
  type: "GetProducts",
  products
});

export const StartGetProducts = (page, limit) => {
  return dispatch => {
    return axios
      .get("https://backendapi.turing.com/products", {
        params: {
          page,
          limit
        }
      })
      .then(function({ data }) {
        dispatch(GetProducts(data.rows));
        return false;
      })
      .catch(function(error) {
        throw error;
      });
  };
};

export const GetProductsBaseOnCategory = product_id => {
  return dispatch => {
    return axios
      .get(`https://backendapi.turing.com/products/inCategory/${product_id}`)
      .then(({ data }) => {
        dispatch(GetProducts(data.rows));
        return false;
      })
      .catch(function(error) {
        throw error;
      });
  };
};

export const GetSearchedProduct = word => {
  return dispatch => {
    return axios
      .get(`https://backendapi.turing.com/products/search`, {
        params: {
          query_string: word
        }
      })
      .then(({ data }) => {
        dispatch(GetProducts(data.rows));
        return false;
      });
  };
};
