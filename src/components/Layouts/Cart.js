import React, { Component, Fragment } from "react";
import { Button, Grid, Container, Divider, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Counter from "../common/Counter";
import { CartLoader } from "../common/PreLoader";
import ShopMax from "../../Logic";
export default class Cart extends Component {
  state = {
    products: []
  };
  componentWillMount() {
    this.handleUpadate();
  }

  handleUpadate = () => {
    const getCart = ShopMax.getCart();
    if (getCart) {
      getCart
        .then(res => {
          this.setState(prevState => {
            return {
              products: res
            };
          });
        })
        .catch(error => console.log(error));
    }
  };

  handleRemove = item_id => {
    ShopMax.removeItem(item_id).then(() => {
      this.handleUpadate();
    });
  };

  render() {
    const { products } = this.state;

    return (
      <Fragment>
        <Container>
          <div className="margin-top-large">
            <h2>4 Items In Your Cart</h2>
            <div className="margin-top-small">
              <Grid stackable columns="equal">
                <Grid.Column width={8}>
                  <h4>Items</h4>
                </Grid.Column>
                <Grid.Column>
                  <h4>Size</h4>
                </Grid.Column>
                <Grid.Column>
                  <h4>Quantity</h4>
                </Grid.Column>
                <Grid.Column>
                  <h4>Price</h4>
                </Grid.Column>
              </Grid>
            </div>
          </div>
          <Divider />

          {products.length > 0 ? (
            products.map(
              ({ price, attributes, quantity, subtotal, name, item_id }) => (
                <div
                  key={item_id}
                  className="margin-top-small margin-bottom-small"
                >
                  <Grid stackable columns="equal">
                    <Grid.Column width={8}>
                      <div className="flex ">
                        <div className="margin-right-small">
                          <Image
                            src={`https://docs.google.com/drawings/d/e/2PACX-1vQauR0AfYi1EezNYQ9yKqrcj__KE06RYOFJKZKAUq8D6l7jPDkH3h4cayemBrdiDoBfGld90iUhgFje/pub?w=480&h=360`}
                            size="small"
                          />
                        </div>

                        <div>
                          <p>{name}</p>

                          <p>
                            <span
                              className="very-tiny-padding logo-red text-bold"
                              onClick={() => this.handleRemove(item_id)}
                            >
                              X
                            </span>{" "}
                            Remove
                          </p>
                        </div>
                      </div>
                    </Grid.Column>
                    <Grid.Column>
                      <span>Size & Color</span> <h4>{attributes}</h4>
                    </Grid.Column>
                    <Grid.Column>
                      <h4>Quantity</h4>
                      <Counter
                        count={quantity}
                        item_id={item_id}
                        handleUpadate={this.handleUpadate}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <span>
                        <span className="very-tiny-padding-right">Price:</span>
                        <span className="text-bold">&#65505;</span> {price}
                      </span>
                    </Grid.Column>

                    <Grid.Column>
                      <span>
                        <span className="very-tiny-padding-right">
                          Subtotal:
                        </span>
                        <span className="text-bold">&#65505;</span> {subtotal}
                      </span>
                    </Grid.Column>
                  </Grid>
                </div>
              )
            )
          ) : (
            <div className="margin-top-small margin-bottom-small">
              <CartLoader />
            </div>
          )}

          <div
            id="cartAction"
            className="flex justify-between margin-bottom-small very-tiny-padding"
          >
            <Link to="/" className="ui button passive">
              Back to Shop
            </Link>
            <Button className="action" disabled>
              Checkout
            </Button>
          </div>
        </Container>
      </Fragment>
    );
  }
}
