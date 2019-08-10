import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Menu, Label, Icon, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Logout } from "../../Actions/User";
import ShopMax from "../../Logic";

class NavBarHasCart extends Component {
  state = {
    cartCount: ""
  };
  componentWillMount() {
    const getCartCount = ShopMax.getCart();
    if (getCartCount) {
      getCartCount.then(res => this.setState({ cartCount: res.length }));
    }
  }
  render() {
    const { User, startUserLogout } = this.props;
    const { cartCount } = this.state;
    return (
      <Fragment>
        <section className="flex justify-around very-tiny-padding">
          {!User.accessToken ? (
            <div>
              <span className="very-tiny-padding">
                Hi{" "}
                <Link to="/auth" className="logo-red">
                  Sign In
                </Link>
              </span>

              <span>Or</span>

              <span className="very-tiny-padding">
                Hi{" "}
                <Link to="/auth" className="logo-red">
                  Register
                </Link>
              </span>
            </div>
          ) : (
            <Menu horizontal="true" className="action">
              <Dropdown item text={User.customer.email} className="text-white">
                <Dropdown.Menu>
                  <Link to="/profile">
                    {" "}
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </Link>
                  <Dropdown.Item onClick={() => startUserLogout()}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
          )}

          <div className="none">
            <span className="very-tiny-padding">
              <Link to="/card" className="text-black text-bold">
                Daily Deals
              </Link>
            </span>

            <span className="very-tiny-padding">
              <Link to="/card" className="text-black text-bold">
                Sell
              </Link>
            </span>

            <span className="very-tiny-padding">
              <Link to="/card" className="text-black text-bold">
                Help & Contact
              </Link>
            </span>
          </div>

          <div>
            <span className="text-black text-bold none">
              {" "}
              <span>&#65505;</span> GBP
            </span>
          </div>

          <Link to="/cart" className="text-black">
            <div>
              <span id="cart" className="very-tiny-padding">
                <Icon name="shopping bag" />
                {!!cartCount && (
                  <Label color="red" circular id="bag-label">
                    {cartCount}
                  </Label>
                )}
              </span>

              <span className="very-tiny-padding none">
                Your bag: <span>&#65505;</span> 3.99
              </span>
            </div>
          </Link>
        </section>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startUserLogout: user => dispatch(Logout())
});

const mapStateToProps = ({ User }) => ({ User });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBarHasCart);
