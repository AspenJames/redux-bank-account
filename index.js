const redux = require('redux');
const keypress = require('keypress');

const initialState = { balance: 5000 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PAID':
      console.log(`PAYDAY! + $${action.payload}!`);
      return {...state, balance: state.balance + action.payload};

    case 'BUY_LUNCH':
      console.log("You'd really save more by packing your lunch.");
      return {...state, balance: state.balance + action.payload};

    case 'BUY_CAR':
      console.log(`You buy a used car for $${0-action.payload}`);
      return {...state, balance: state.balance + action.payload};

    case 'GAMBLE':
      if (Math.random() > 0.3) {
        console.log(`Better luck next time, lost $${action.payload/3}`);
        return {...state, balance: state.balance - action.payload/3};
      }
      console.log(`Congrats, you won $${action.payload}!`);
      return {...state, balance: state.balance + action.payload};

    default:
      return state;
  }
}

const store = redux.createStore(reducer);
/* createStore is a function provided to us by
 * Redux that will create our store object.
 */

const MENU = '(l) buy lunch (c) buy car (g) gamble (p) get paid (x) exit';

store.subscribe(() => {
  const state = store.getState(); // grab our state

  console.log();
  console.log('Your bank account: ', state); // print out our balance

  console.log();
  console.log(MENU); // display the menu
  console.log();
});

store.dispatch({type: '__INIT__'});
/* Here we're dispatching an initial action to
 * our store. For this first action, our state
 * is 'undefined', so the default initialState
 * will be loaded into our store. Since the 
 * action type does not match any of our cases
 * the default state will be returned.
 */

// This next bit sets up our CLI
keypress(process.stdin)

process.stdin.on('keypress', (ch, key) => {
  if (key) switch (key.name) {
    case 'l':
      store.dispatch({type: 'BUY_LUNCH', payload: -20});
      break;

    case 'c':
      store.dispatch({type: 'BUY_CAR', payload: -3000});
      break;

    case 'g':
      store.dispatch({type: 'GAMBLE', payload: 3000});
      break;

    case 'p':
      store.dispatch({type: 'GET_PAID', payload: 2000});
      break;

    case 'x':
      process.stdin.pause();

    default:
      break;
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();
