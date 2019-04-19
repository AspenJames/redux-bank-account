const redux = require('redux');
const keypress = require('keypress');

/* Our Reducer function will go here
 *
 * We'll need cases for each of the following:
 * Buy lunch (-20)
 * Buy used car (-3000)
 * Gamble (-1000 || +3000)
 * Get Paid (+2000)
 *
 */

const initialState = { balance: 5000 }
let prevState;
const reducer = (state = initialState, action) => {
  prevState = state;
  console.log("action", action);
  switch (action.type) {
    case "GET_PAID":
      console.log("state before update", state)
      console.log("Get Paid! +2000")
      let updatedState =  {...state, balance: state.balance + action.amount}
      console.log("updatedState", updatedState)
      console.log("original state", state)
      return updatedState;

    case "BUY_LUNCH":
      console.log("buy lunch, -20")
      return {...state, balance: state.balance - action.amount}

    case "GAMBLE":
      if (Math.random() > 0.3) {
        console.log("sucks to lose -1000")
        return {...state, balance: state.balance - action.amount/3}
      }
      console.log("congrats +3000")
      return {...state, balance: state.balance + action.amount}

    case "BUY_CAR":
      console.log("bought a car -2500")
      return {...state, balance: state.balance - action.amount}

    default:
      return state;
  }
}

const store = redux.createStore(reducer);

const MENU = '(l) buy lunch (c) buy car (g) gamble (p) get paid (x) exit';

store.subscribe(() => {
  const state = store.getState(); // grab our state

  console.log();
  console.log('Your bank account: ', state); // print out our balance

  console.log();
  console.log(MENU); // display the menu
  console.log();
});


console.log(store.getState())
console.log(MENU)
// This next bit sets up our CLI
keypress(process.stdin)

process.stdin.on('keypress', (ch, key) => {
  if (key) switch (key.name) {
    case 'l':
      store.dispatch({type: 'BUY_LUNCH', amount: 20});
      break;

    case 'c':
      store.dispatch({type: 'BUY_CAR', amount: 2500});
      break;

    case 'g':
      store.dispatch({type: "GAMBLE", amount: 3000});
      break;

    case 'p':
      store.dispatch({type: "GET_PAID", amount: 2000});
      break;

    case 'x':
      process.stdin.pause();

    default:
      break;
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();
