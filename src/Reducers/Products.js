const DefaultProducts = [];

export default (state = DefaultProducts, action) => {
  switch (action.type) {
    case "GetProducts":
      return [...action.products];

    default:
      return state;
  }
};
