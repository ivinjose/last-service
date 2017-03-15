
const serviceDetailsReducer = (state = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return action.data;
    case 'REMOVE':
      return state - 1;
    default:
      return state;
  }
}

export default serviceDetailsReducer;