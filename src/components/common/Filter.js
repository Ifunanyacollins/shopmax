import React, { Fragment, Component } from "react";
import { Accordion, Form, Menu, Radio, Button } from "semantic-ui-react";
import { connect } from "react-redux";

import { CategoryLoader } from "../common/PreLoader";
import { StartGetCategory } from "../../Actions/ProductActions";
import { GetProductsBaseOnCategory } from "../../Actions/Products";
import { StartGetProducts } from "../../Actions/Products";

class Select extends Component {
  state = { activeIndex: 1, value: "" };

  componentDidMount() {
    if (this.props.Categories.length <= 0) {
      this.props
        .dispatch(StartGetCategory())
        .catch(error => console.log("error"));
    }
  }

  handleClick = index => {
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  handleClickGetAllProducts = () => {
    this.props.handleIsLoading(true);
    this.props
      .dispatch(StartGetProducts(1, 20))
      .then(res => {
        this.props.handleIsLoading(res);
        this.setState({ value: "" });
      })
      .catch(error => console.log("error"));
  };

  handleChange = id => {
    this.setState({ value: id });
    this.props.handleIsLoading(true);
    this.props.dispatch(GetProductsBaseOnCategory(id)).then(res => {
      if (!res) {
        this.props.handleIsLoading(res);
      }
    });
  };

  render() {
    const { activeIndex, value } = this.state;
    const { Categories } = this.props;

    return (
      <Fragment>
        <div className="custom-filter ">
          <div className="header__inFilter very-tiny-padding">
            <h2>Categories</h2>
          </div>

          {!!value ? (
            <div className="margin-top-small very-tiny-padding flex justify-center">
              <Button
                className="action"
                onClick={this.handleClickGetAllProducts}
              >
                All product
              </Button>
            </div>
          ) : (
            ""
          )}

          <div className="margin-top-small very-tiny-padding">
            {Categories.length > 0 ? (
              <Accordion as={Menu} vertical>
                {Categories.map(
                  ({ id, department_name, categories }, index) => (
                    <Menu.Item key={index}>
                      <Accordion.Title
                        active={activeIndex === id}
                        content={department_name}
                        index={id}
                        onClick={() => this.handleClick(id)}
                      />
                      <Accordion.Content active={activeIndex === id}>
                        <Form>
                          {categories.map(({ name, category_id }, index) => (
                            <Form.Field key={index}>
                              <Radio
                                label={name}
                                name={department_name}
                                value={category_id}
                                checked={this.state.value === category_id}
                                onChange={() => this.handleChange(category_id)}
                              />
                            </Form.Field>
                          ))}
                        </Form>
                      </Accordion.Content>
                    </Menu.Item>
                  )
                )}
              </Accordion>
            ) : (
              <CategoryLoader />
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(({ Categories }, props) => {
  return {
    Categories
  };
})(Select);
