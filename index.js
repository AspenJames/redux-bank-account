const redux = require('redux');
const keypress = require('keypress');

const initialState = { balance: 5000 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PAID':
      console.log("PAYDAY! +2000");
      return {...state, balance: state.balance + 2000};

    case 'BUY_LUNCH':
      console.log("You'd really save more by packing your lunch.");
      return {...state, balance: state.balance - 20};

    case 'BUY_CAR':
      console.log("You buy a used car for 3000");
      return {...state, balance: state.balance - 3000};

    case 'GAMBLE':
      if (Math.random() > 0.3) {
        console.log("Better luck next time, lost 1000");
        return {...state, balance: state.balance - 1000};
      }
      console.log("Congrats, you won 3000!");
      return {...state, balance: state.balance + 3000};

    default:
      return state;
  }
}


const MENU = '(l) buy lunch (c) buy car (g) gamble (p) get paid (x) exit';

store.subscribe(() => {
  const state = store.getState(); // grab our state

  console.log();
  console.log('Your bank account: ', state); // print out our balance

  console.log();
  console.log(MENU); // display the menu
  console.log();
});

// This next bit sets up our CLI
keypress(process.stdin)

process.stdin.on('keypress', (ch, key) => {
  if (key) switch (key.name) {
    case 'l':
      store.dispatch({type: 'BUY_LUNCH'});
      break;

    case 'c':
      store.dispatch({type: 'BUY_CAR'});
      break;

    case 'g':
      store.dispatch({type: 'GAMBLE'});
      break;

    case 'p':
      store.dispatch({type: 'GET_PAID'});
      break;

    case 'x':
      process.stdin.pause();

    default:
      break;
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();
