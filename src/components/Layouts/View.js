import React, { Component, Fragment } from "react";
import moment from "moment";
import {
  Grid,
  Image,
  Container,
  Rating,
  Label,
  Button
} from "semantic-ui-react";
import NavBarHasCart from "../common/NavMenu";
import { ColorLoader } from "../common/PreLoader";
import ShopMax from "../../Logic";

export default class View extends Component {
  state = {
    active: 0,
    size: "",
    color: "",
    quantity: "",
    error: "",
    sizes: [],
    colors: [],
    product: {},
    reviews: []
  };

  componentWillMount() {
    const product_id = this.props.match.params.id;

    ShopMax.getAllAtribute(product_id).then(attributes => {
      if (attributes) {
        attributes.forEach(attribute => {
          if (attribute.attribute_name === "Color") {
            this.setState(prevState => {
              return {
                colors: [...prevState.colors, attribute]
              };
            });
          } else {
            this.setState(prevState => {
              return {
                sizes: [...prevState.sizes, attribute]
              };
            });
          }
        });
      }
    });

    ShopMax.getProduct(product_id).then(product => {
      if (product) {
        this.setState({ product: product });
      }
    });

    ShopMax.getProductReview(product_id).then(reviews => {
      if (reviews) {
        this.setState({ reviews: [...reviews] });
      }
    });
  }

  handleActive = (num, image) => {
    const newImage = { thumbnail: image };
    this.setState(prevState => {
      return {
        active: num,
        product: { ...prevState.product, ...newImage }
      };
    });
  };

  handleSelectColor = color => {
    this.setState({ color });
  };

  handleSelectSize = size => {
    this.setState({ size });
  };

  startAddingToCart = data => {
    ShopMax.addToCart(data)
      .then(res => this.setState({ error: false }))
      .catch(error => this.setState({ error: true }));
  };

  handleAddTocart = () => {
    const generatedCartId = ShopMax.generateCartId();
    const { size, color, quantity } = this.state;
    const { product_id } = this.state.product;
    if (typeof generatedCartId === "string") {
      const data = {
        size,
        color,
        quantity,
        cart_id: generatedCartId,
        product_id
      };
      this.startAddingToCart(data);
    } else {
      generatedCartId.then(res => {
        const data = {
          size,
          color,
          quantity,
          product_id,
          cart_id: res
        };
        this.startAddingToCart(data);
      });
    }
  };
  render() {
    const { active, sizes, colors, reviews, size, color, error } = this.state;
    const {
      description,
      image,
      image_2,
      name,
      thumbnail,
      price
    } = this.state.product;
    return (
      <Fragment>
        <NavBarHasCart />
        <section className="notLanding__section">
          <Container className="margin-top-small view">
            <Grid stackable columns="equal">
              <Grid.Column>
                <div>
                  <Image
                    src={`https://backendapi.turing.com/images/products/${thumbnail}`}
                    size="large"
                  />
                </div>

                <div className="flex margin-top-small justify-between very_small-width">
                  <div className={active === 0 ? "active-view__image" : ""}>
                    <Image
                      src={`https://backendapi.turing.com/images/products/${image}`}
                      size="tiny"
                      onClick={() => this.handleActive(0, image)}
                    />
                  </div>

                  <div className={active === 1 ? "active-view__image" : ""}>
                    <Image
                      src={`https://backendapi.turing.com/images/products/${image_2}`}
                      size="tiny"
                      onClick={() => this.handleActive(1, image_2)}
                    />
                  </div>
                </div>
              </Grid.Column>

              <Grid.Column>
                <p className="view-title">{name}</p>
                <Rating
                  icon="star"
                  maxRating={5}
                  defaultRating={4}
                  disabled
                  size="large"
                />
                <p>{description}</p>

                <div className="logo-red text-bold" style={{ fontSize: "2em" }}>
                  <span>&#65505;</span> {price}
                </div>

                <div>
                  <h5>Color ({color})</h5>
                  {colors.length > 0 ? (
                    colors.map(({ attribute_value: color }) => (
                      <Label
                        key={color}
                        circular
                        onClick={() => this.handleSelectColor(color)}
                        empty
                        className={`${color} circular-label__border`}
                        size="huge"
                      />
                    ))
                  ) : (
                    <ColorLoader />
                  )}
                </div>
                <div>
                  <h5>Size ({size})</h5>
                  {sizes.length > 0 ? (
                    sizes.map(({ attribute_value: size }) => (
                      <Label
                        content={size}
                        key={size}
                        onClick={() => this.handleSelectSize(size)}
                      />
                    ))
                  ) : (
                    <ColorLoader />
                  )}
                </div>

                <div className="margin-top-small" inline="true">
                  <Button className="action" onClick={this.handleAddTocart}>
                    Add to cart
                  </Button>

                  {error === true && (
                    <Label basic color="red" pointing="left">
                      error adding item
                    </Label>
                  )}

                  {error === false && (
                    <Label basic color="green" pointing="left">
                      item added
                    </Label>
                  )}
                </div>
              </Grid.Column>
            </Grid>
          </Container>
        </section>

        <section>
          <Container className="Padding">
            <p className="view-subtitle">Product reviews</p>
            {reviews.map(({ name, review, created_on, rating }, index) => (
              <Grid key={index} stackable columns={2}>
                <Fragment>
                  <Grid.Column width={4}>
                    <Rating
                      icon="star"
                      maxRating={5}
                      defaultRating={rating}
                      disabled
                    />

                    <p className="view-review__user">{name}</p>
                    <span>{moment([created_on]).fromNow()}</span>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <p>{review}</p>
                  </Grid.Column>
                </Fragment>
              </Grid>
            ))}
          </Container>
        </section>
      </Fragment>
    );
  }
}
