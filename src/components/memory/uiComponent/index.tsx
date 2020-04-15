// import React, { useState, useEffect, useReducer } from 'react';
// import '../uiComponent/ui.css';
// import { Images } from '../Images';
// import { DefaultImg } from '../Images';

// // import { Flip } from 'react-awesome-reveal';

// interface RedCards {
//   id: number,
//   imgUrl?: string,
//   open?: boolean,
// }

// interface State {
//   mCards: RedCards[];
// }

// const initialState: State = {
//   mCards: [],
// };


// type Actions =
//   | { type: 'INITIAL_RENDER'}
//   | { type: 'CARD_CLICKED', index: number };

 

// // type State = RedCards[]|undefined;


// const shuffleCards = () => {
//   let updatedCards = [];
//   for (var i = 0; i < 4; i++) {
//     updatedCards.push({
//       imgUrl: Images[Math.floor(i / 2)],
//       id: i,
//       open: false
//     })
//   }
//   updatedCards.sort(() => Math.random() - 0.5);
//   return updatedCards;
// }

// const reducerFn:React.Reducer<State, Actions> = (state: State, action: Actions,init:any) => {
//   console.log('state', state)
//   switch (action.type) {
//     case "INITIAL_RENDER":
//       let updatedValue = shuffleCards();
//       if (updatedValue)
//       return state;
//         // return updatedValue
//         // return [{...state,state.mCards:updatedValue}]
//         break;
//      case "CARD_CLICKED":
//       return state;
//         // return [{...state,id:2}];
//         // return [{...state}];
//         // console.log('state[action.index].open:false',state&&state[action.index])
//   }
// }

// function init() {
//   return initialState;
// }


// const Uirender: React.FC = () => {
//   const [cards, setCards] = useState([{ id: 0, imgUrl: '', open: false }]);
//   const [reducerCards, dispatch] = useReducer<React.Reducer<State, Actions>>(reducerFn, initialState)
//   // const [reducerCards, dispatch] = useReducer(reducerFn, initialState,init);

//   useEffect(() => {
//     let updatedValue = shuffleCards();
//     dispatch({ type: 'INITIAL_RENDER' })
//     setCards(updatedValue);

//   }, []);



//   const handleClick = (id: number) => {
//     let value = [...cards]
//     value[id].open = !value[id].open
//     setCards(value);
//     // dispatch({ type: 'INITIAL_RENDER',index:id })

//   }

//   return (
//     <div >
//       <p>Ui renders here</p>
//       <div className="container" >
//         {console.log('p][[][][][[][r',reducerCards)}
//         {cards && cards.map((eachCard, i) =>
//           <figure key={eachCard.id} className="figure-block">
//             <img className="img-block"
//               src={eachCard.open ? eachCard.imgUrl : DefaultImg}
//               alt="Memory"
//               onClick={() => handleClick(i)} />
//           </figure>
//         )}

//       </div>

//     </div>
//   )
// }

// export default Uirender;
import  React,{ useReducer,useEffect,useState } from 'react';
import '../uiComponent/ui.css';
import { Images } from '../Images';
import { DefaultImg } from '../Images';
// import { Flip } from 'react-awesome-reveal';

type Actions =
| { type: 'INITIAL_RENDER'}
| { type: 'CARD_CLICKED', index: number };


interface RedCards {
  id: number,
  imgUrl?: string,
  open?: boolean,
}

interface IState {
  mCards: RedCards[];
}

 

const initialState: IState = {mCards: []};

const shuffleCards = () => {
  let updatedCards = [];
  for (var i = 0; i < 4; i++) {
    updatedCards.push({
      imgUrl: Images[Math.floor(i / 2)],
      id: i,
      open: false
    })
  }
  updatedCards.sort(() => Math.random() - 0.5);
  return updatedCards;
}

const reducer: React.Reducer<IState, Actions> = (state, action) => {
  switch (action.type) {
    case 'INITIAL_RENDER':
      let shuffleResult=[];
      shuffleResult = shuffleCards();
      if(shuffleResult){
        return {...state,mCards:state.mCards.concat(shuffleResult)};
      }
      return state ;
    case 'CARD_CLICKED':
      let value = [...state.mCards];
      value[action.index].open = true;
      return  {...state,mCards:value};
    default:
      throw new Error();
  }
}





const Uirender: React.FC = () => {
  const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, initialState);
  const [cards, setCards] = useState([{ id: 0, imgUrl: '', open: false }]);

  useEffect(() => {
    let updatedValue = shuffleCards();
    dispatch({ type: 'INITIAL_RENDER' })
    setCards(updatedValue);
  }, []);

  const handleClick = (id: number) => {
    let value = [...cards]
    value[id].open = !value[id].open
    setCards(value);
    dispatch({ type: 'CARD_CLICKED',index:id })
  }

  return (
    <div >
      {console.log('state',state)}
    <p>Ui renders here</p>
    <div className="container" >
      {cards && cards.map((eachCard, i) =>
        <figure key={eachCard.id} className="figure-block">
          <img className="img-block"
            src={eachCard.open ? eachCard.imgUrl : DefaultImg}
            alt="Memory"
            onClick={() => handleClick(i)} />
        </figure>
      )}
    </div>
  </div>
  );
    }
    export default Uirender;
