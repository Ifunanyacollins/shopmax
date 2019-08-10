import axios from "axios";

class Shopmax {
  getAllAtribute(product_id) {
    return axios
      .get(`https://backendapi.turing.com/attributes/inProduct/${product_id}`)
      .then(({ data }) => data)
      .catch(error => {
        throw error;
      });
  }
  getProduct(product_id) {
    return axios
      .get(`https://backendapi.turing.com/products/${product_id}`)
      .then(({ data }) => data)
      .catch(error => {
        throw error;
      });
  }

  getProductReview(product_id) {
    return axios
      .get(`https://backendapi.turing.com/products/${product_id}/reviews`)
      .then(({ data }) => data)
      .catch(error => {
        throw error;
      });
  }
  generateCartId() {
    const cart_id = localStorage.getItem("cart_id");

    if (cart_id) {
      return cart_id;
    }
    return axios
      .get(`https://backendapi.turing.com/shoppingcart/generateUniqueId`)
      .then(({ data }) => {
        localStorage.setItem("cart_id", data.cart_id);
        return data.cart_id;
      })
      .catch(error => {
        throw error;
      });
  }

  addToCart({ cart_id, product_id, color, size, quantity }) {
    return axios({
      method: "post",
      url: "https://backendapi.turing.com/shoppingcart/add",
      data: {
        cart_id: cart_id,
        product_id: product_id,
        attributes: `${color},${size}`,
        quantity: quantity
      }
    })
      .then(({ data }) => data)
      .catch(error => {
        throw error;
      });
  }

  getCart() {
    const cart_id = localStorage.getItem("cart_id");
    if(!cart_id){
      return false
    }
    return axios
      .get(`https://backendapi.turing.com/shoppingcart/${cart_id}`)
      .then(({ data }) => data)
      .catch(error => {
        throw error;
      });
  }

  getMainOrdr(){
     const userAccestoken = JSON.parse(localStorage.getItem('shopMax_UserData'))
      return axios({
      method: "post",
      url: "https://backendapi.turing.com/orders",
         headers:{
        "user-key":userAccestoken.accessToken

      },
      data: {
        cart_id:'1xh7q2z4qajvzi5ag5',
        shipping_id:2,
        tax_id:1
      }
    })
      .then(({ data }) => console.log(data) )
      .catch(error => {
        throw error;
      });

  }

  updateCart(item_id, quantity) {
    return axios({
      method: "put",
      url: `https://backendapi.turing.com/shoppingcart/update/${item_id}`,
      data: {
        quantity
      }
    })
      .then(({ data }) => data)
      .catch(error => {
        throw error;
      });
  }

  removeItem(item_id) {
    return axios({
      method: "delete",
      url: `https://backendapi.turing.com/shoppingcart/removeProduct/${item_id}`
    })
      .then(res => console.log(res))
      .catch(error => {
        throw error;
      });
  }
  register(name, email, password) {
    return axios({
      method: "post",
      url: "https://backendapi.turing.com/customers",
      data: {
        name,
        email,
        password
      }
    })
      .then(data => console.log(data))
      .catch(error => {
        throw error;
      });
  }

  login(email, password) {
    return axios({
      method: "post",
      url: "https://backendapi.turing.com/customers/login",
      data: {
        email,
        password
      }
    })
      .then(({ accessToken }) => console.log(accessToken))
      .catch(error => {
        throw error;
      });
  }
}

export default new Shopmax();
