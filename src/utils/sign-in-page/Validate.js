export const initialState = {
  email: {
    value: null,
  },
  password: {
    value: null,
  },
  rePassword: {
    value: null,
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'value/validEmailChecked':
      const pattern = /(\W|^)[\w.+\-]*@gmail\.com(\W|$)/gi;
      if (!pattern.test(action.payload))
        return {
          ...state,
          email: {
            value: null,
            message: "The email's format is not valid",
          },
        };
      return {
        ...state,
        email: {
          value: action.payload,
        },
      };
    case 'value/validPasswordChecked':
      if (action.payload.length < 8 || action.payload.length > 20)
        return {
          ...state,
          password: {
            value: null,
            message:
              "The password's length is not less than 8 and more than 20",
          },
        };
      else if (action.payload.startsWith(' ') || action.payload.endsWith(' '))
        return {
          ...state,
          password: {
            value: null,
            message: 'The password must not contain space at begin or at end',
          },
        };
      return {
        ...state,
        password: {
          value: action.payload,
        },
      };
    case 'value/validRePasswordChecked':
      if (action.payload != state.password.value)
        return {
          ...state,
          rePassword: {
            value: null,
            message: 'The re-password does not match',
          },
        };
      return {
        ...state,
        rePassword: {
          value: action.payload,
        },
      };
  }
};
export const checkValidEmailAction = (value) => {
  return {
    type: 'value/validEmailChecked',
    payload: value,
  };
};
export const checkValidPasswordAction = (value) => {
  return {
    type: 'value/validPasswordChecked',
    payload: value,
  };
};
export const checkValidRePasswordAction = (value) => {
  return {
    type: 'value/validRePasswordChecked',
    payload: value,
  };
};
