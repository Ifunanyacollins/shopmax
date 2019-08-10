import React, { Fragment, Component } from "react";
import { Form, Input, Button, Checkbox } from "semantic-ui-react";

export default class Delivery extends Component {
  state = {
    isOn: true
  };
  handleChangeForBilling = () => {
    this.setState(prevState => {
      return {
        isOn: !prevState.isOn
      };
    });
  };

  render() {
    const { isOn } = this.state;
    return (
      <Fragment>
        <div>
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="First name"
                placeholder="First name"
              />
              <Form.Field
                control={Input}
                label="Last name"
                placeholder="Last name"
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Address"
                placeholder="Address"
              />

              <Form.Field control={Input} label="City" placeholder="City" />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field control={Input} label="State" placeholder="State" />

              <Form.Field
                control={Input}
                label="Zip Code"
                placeholder="Zip Code"
              />
            </Form.Group>

            <div className="margin-top-large">
              <Form.Field
                control={Checkbox}
                checked={isOn}
                toggle
                label="My billing information is the same with my delivery information"
                onChange={this.handleChangeForBilling}
              />
            </div>

            <div className="margin-top-large">
              <h4>Delivery options</h4>

              <div className="flex justify-between flex-column">
                <Form.Field className="flex">
                  <input
                    type="radio"
                    name="checkboxRadioGroup"
                    value="standard"
                    className="ui checkbox"
                  />
                  <span className="very-tiny-padding-left">
                    Standard shipping (
                    <span className="text-bold">Free 2-3 Business days)</span>
                  </span>
                </Form.Field>

                <Form.Field className="flex">
                  <input
                    type="radio"
                    name="checkboxRadioGroup"
                    value="standard"
                    className="ui checkbox"
                  />
                  <span className="very-tiny-padding-left">
                    Express shipping (
                    <span className="text-bold">
                      &#65505; 1-2 Business days)
                    </span>
                  </span>
                </Form.Field>
              </div>
            </div>

            <div
              id="cartAction"
              className="flex justify-between  margin-top-small very-tiny-padding"
            >
              <Button className="passive">Back to Cart</Button>
              <Button className="action">Next Page</Button>
            </div>
          </Form>
        </div>
      </Fragment>
    );
  }
}
