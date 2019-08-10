import React, { Fragment } from "react";
import { Image, Button, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default ({
  name,
  discounted_price,
  price,
  thumbnail,
  isNew = false,
  product_id
}) => (
  <Fragment>
    <Link to={`/view/${product_id}`}>
      <div className="custom-card">
        {isNew ? (
          <div className="flex justify-right very-tiny-padding">
            <Label color="red">New</Label>
          </div>
        ) : (
          ""
        )}

        <div className="very-tiny-padding">
          <Image
            src={`https://backendapi.turing.com/images/products/${thumbnail}`}
            size="small"
            centered
          />
        </div>

        <div className="flex justify-center">
          <div>
            <div className="very-tiny-padding">
              <span>{name}</span>
            </div>
            <div className="very-tiny-padding">
              {discounted_price !== "0.00" ? (
                <span className="discount">
                  <span>&#65505;</span> {discounted_price}
                </span>
              ) : (
                ""
              )}

              <span>
                <span>&#65505;</span> {price}
              </span>
            </div>
            <div className="very-tiny-padding">
              {discounted_price !== "0.00" ? (
                <Button className="action">Buy now</Button>
              ) : (
                <Button className="action">Quick View</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  </Fragment>
);
