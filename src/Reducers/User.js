const DefaultUser = {
  customer: {},
  accessToken: ""
};

export default (state = DefaultUser, action) => {
  switch (action.type) {
    case "setUser":
      return {
        customer: { ...action.UserData.customer },
        accessToken: action.UserData.accessToken
      };

      case "Logout":
      return {
        customer: {},
        accessToken:''
      };

    default:
      return state;
  }
};
