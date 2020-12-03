const initState = {
  UserInfo: {
    Token: null,
    FirstName: null,
    LastName: null,
    Email: null,
    ID: null,
  },
  GoogleMapsAPIKey: null,
};

const rootReducer = (state = initState, action) => {
  if (action.type === "SET_USER_INFO") {
    const UpdatedUserInfo = {
      Token: action.UserInfo.Token,
      FirstName: action.UserInfo.FirstName,
      LastName: action.UserInfo.LastName,
      Email: action.UserInfo.Email,
    };

    return {
      ...state,
      UserInfo: UpdatedUserInfo,
    };
  }

  return state;
};

export default rootReducer;
