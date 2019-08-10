import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Input, Menu, Segment, Icon } from "semantic-ui-react";

import { GetSearchedProduct, StartGetProducts } from "../../Actions/Products";
class NavBar extends Component {
  state = { activeItem: "home" };

  handleItemClick = name => this.setState({ activeItem: name });

  handleSearch = word => {
    if (!!word) {
      this.props.dispatch(GetSearchedProduct(word));
    } else {
      this.props.handleIsLoading(true);
      this.props
        .dispatch(StartGetProducts(1, 20))
        .then(res => {
          this.props.handleIsLoading(res);
        })
        .catch(error => console.log("error"));
    }
  };

  render() {
    return (
      <Fragment>
        <Segment inverted>
          <Menu secondary className="flex justify-between">
            <Menu.Item>
              <h1 className="logo-red margin-right-small">SHOPMAX</h1>
            </Menu.Item>

            <Menu.Menu>
              <Menu.Item>
                <Input
                  icon="search"
                  placeholder="Search..."
                  className="custom-input__search none"
                  onChange={e => this.handleSearch(e.target.value)}
                />
              </Menu.Item>

              <Menu.Item className="none_large--screen">
                <Icon
                  name="align justify"
                  onClick={() => this.props.handleShowClick()}
                />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Segment>
      </Fragment>
    );
  }
}
export default connect(({ User }, props) => {
  return { User };
})(NavBar);
