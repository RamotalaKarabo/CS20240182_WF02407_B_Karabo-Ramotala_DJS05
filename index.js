const countType = {
   type: 'INCREMENT',
   type: 'DECREMENT'
}

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

let store = Redux.createStore(counter);

store.subscribe(() => console.log(store.getState()));