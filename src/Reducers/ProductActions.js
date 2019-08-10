const DefaultProductActions = [];

export default (state = DefaultProductActions, action) => {
  switch (action.type) {
    case "GetCategory":
      return [...state, action.category];

    default:
      return state;
  }
};
