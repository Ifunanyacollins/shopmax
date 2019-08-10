import React, { Component, Fragment } from "react";
import { Label, Icon } from "semantic-ui-react";
import ShopMax from "../../Logic";

export default class Counter extends Component {
  state = {
    value: this.props.count || 0
  };
  handelIncrement = cart_id => {
    this.setState(prevState => {
      ShopMax.updateCart(cart_id, prevState.value + 1).then(() => {
        this.props.handleUpadate();
      });
      return {
        value: prevState.value + 1
      };
    });
  };

  handelDecrement = cart_id => {
    this.setState(prevState => {
      if (prevState.value === 0) {
        return false;
      }
      ShopMax.updateCart(cart_id, prevState.value - 1).then(() => {
        this.props.handleUpadate();
      });
      return {
        value: prevState.value - 1
      };
    });
  };

  render() {
    const { value } = this.state;
    return (
      <Fragment>
        <div className="flex">
          <div id="upKey">
            <Label
              circular
              className="text-white Primary"
              size="large"
              onClick={() => this.handelIncrement(this.props.item_id)}
            >
              <Icon name="arrow alternate circle up outline" />
            </Label>
          </div>
          <div id="countDispaly">
            <Label circular className="White" size="huge">
              {value}
            </Label>
          </div>
          <div id="downKey">
            <Label
              className="text-white Primary"
              circular
              size="large"
              onClick={() => this.handelDecrement(this.props.item_id)}
            >
              <Icon name="arrow alternate circle down outline" />
            </Label>
          </div>
        </div>
      </Fragment>
    );
  }
}
