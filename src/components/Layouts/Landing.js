/*
Very Important to note that the isLoading (from state controllers the content loader component on and off 
  during anydata fecthing)

*/

import React, { Fragment, Component } from "react";
import { Container, Grid, Menu, Sidebar, Input, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";

import NavBar from "../common/NavBar";
import NavBarHasCart from "../common/NavMenu";
import { ProductLoader } from "../common/PreLoader";
import Poster from "../common/Poster";
import Card from "../common/Card";
import Select from "../common/Filter";
import { StartGetProducts, GetSearchedProduct } from "../../Actions/Products";
import ShopMax from '../../Logic'

import "../../App.css";

ShopMax.getMainOrdr()

class Landing extends Component {
  state = {
    isLoading: true,
    activeItem: "deals",
    cartCount: "",
    error: "",
    activePage: 1
  };

  componentDidMount() {
    /*
    Here you get the length of the products and if it is
     than zero it dispatch a redux action to start getting products but if its greater
     than zero it doesnt make the dispatch and product is render base on previous call stored in the redux store
    */
    if (this.props.Products.length <= 0) {
      this.props
        .dispatch(StartGetProducts(1, 20))
        .then(res => this.setState({ isLoading: res }))
        .catch(error => this.setState(error));
    } else {
      this.setState({ isLoading: false });
    }
  }

  //This func stop preloader to stop rendering after data is recieved in the product store.
  handleIsLoading = isLoading => {
    this.setState({ isLoading: isLoading });
  };

  //This the func that enables  search to render products queried through it
  handleSearch = word => {
    if (!!word) {
      this.props.dispatch(GetSearchedProduct(word));
    } else {
      this.handleIsLoading(true);
      this.props
        .dispatch(StartGetProducts(1, 20))
        .then(res => {
          this.handleIsLoading(res);
        })
        .catch(error => this.setState(error));
    }
  };

  handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  };

  //This funcs  open and close according
  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });

  handleSidebarHide = () => this.setState({ visible: false });
  handleItemClick = name => this.setState({ activeItem: name });

  render() {
    const { Products } = this.props;

    const { isLoading, visible, activeItem } = this.state;

    return (
      <Fragment>
        <div>
          <Sidebar.Pushable>
            <Sidebar
              as={Menu}
              animation="push"
              icon="labeled"
              inverted
              onHide={this.handleSidebarHide}
              vertical
              visible={visible}
              width="thin"
            >
              <div className="flex justify-right margin-bottom-large">
                <Icon
                  name="close"
                  className="text-white"
                  onClick={() => this.handleHideClick()}
                />
              </div>
              <Menu secondary vertical>
                <Menu.Item
                  name=" Daily Deals"
                  active={activeItem === "deals"}
                  onClick={() => this.handleItemClick("deals")}
                  className="text-white text-bold"
                />
                <Menu.Item
                  name="  Sell"
                  active={activeItem === "sell"}
                  onClick={() => this.handleItemClick("sell")}
                  className="text-white text-bold"
                />

                <Menu.Item
                  name="Help & Contact"
                  active={activeItem === "help"}
                  onClick={() => this.handleItemClick("help")}
                  className="text-white text-bold"
                />
              </Menu>
            </Sidebar>

            <Sidebar.Pusher>
              <NavBarHasCart />

              <NavBar
                handleIsLoading={this.handleIsLoading}
                handleShowClick={this.handleShowClick}
              />

              <section>
                <Container>
                  <div className="flex justify-center margin-bottom-small margin-top-small none_large--screen">
                    <Input
                      icon="search"
                      placeholder="Search..."
                      className="custom-input__search"
                      onChange={e => this.handleSearch(e.target.value)}
                    />
                  </div>
                  <Poster />
                </Container>
              </section>

              <section className="margin-top-large margin-bottom-large">
                <Container>
                  <Grid stackable>
                    <Grid.Column width={4}>
                      <Select handleIsLoading={this.handleIsLoading} />
                    </Grid.Column>
                    <Grid.Column width={12}>
                      {!isLoading ? (
                        <Grid stackable>
                          <Grid.Row columns={3}>
                            {Products.map((product, index) => (
                              <Grid.Column key={index}>
                                <Card {...product} />
                              </Grid.Column>
                            ))}
                          </Grid.Row>
                        </Grid>
                      ) : (
                        <ProductLoader />
                      )}
                    </Grid.Column>
                  </Grid>
                  <div>
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={10}
                      totalItemsCount={234}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                </Container>
              </section>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </Fragment>
    );
  }
}

export default connect(({ Products, Categories, User }, props) => {
  return {
    Products,
    Categories,
    User
  };
})(Landing);
