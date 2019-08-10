import React, { Component, Fragment } from "react";
import { Step, Container } from "semantic-ui-react";

import Delivery from "../common/Delivery";

export default class Chechkout extends Component {
  render() {
    return (
      <Fragment>
        <Container className="margin-top-large White Padding margin-bottom-large">
          <div className="margin-bottom-small  flex justify-center">
            <Step.Group ordered size="mini">
              <Step completed>
                <Step.Content>
                  <Step.Title>Delivery</Step.Title>
                </Step.Content>
              </Step>

              <Step completed>
                <Step.Content>
                  <Step.Title>Confirmation</Step.Title>
                </Step.Content>
              </Step>

              <Step active>
                <Step.Content>
                  <Step.Title>Payment</Step.Title>
                </Step.Content>
              </Step>

              <Step>
                <Step.Content>
                  <Step.Title>Finish</Step.Title>
                </Step.Content>
              </Step>
            </Step.Group>
          </div>

          <Delivery />
        </Container>
      </Fragment>
    );
  }
}
