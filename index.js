 function createStore(reducer) {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
      listeners.push(listener);
      // Return a function to unsubscribe
      return () => {
          listeners = listeners.filter(l => l !== listener);
      };
  };

  // Initialize state
  dispatch({ type: '@@INIT' });

  return { getState, dispatch, subscribe };
}


const initialState = { count: 0 };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD':
            return { count: state.count + 1 };
        case 'SUBTRACT':
            return { count: state.count - 1 };
        case 'RESET':
            return { count: 0 };
        default:
            return state;
    }
};

const store = createStore(reducer);

// Subscribe to state changes
store.subscribe(() => console.log(store.getState()));

// Dispatch some actions
store.dispatch({ type: 'ADD' });      // { count: 1 }
store.dispatch({ type: 'ADD' });      // { count: 2 }
store.dispatch({ type: 'SUBTRACT' }); // { count: 1 }
store.dispatch({ type: 'RESET' });    // { count: 0 }
