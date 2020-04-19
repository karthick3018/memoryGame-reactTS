import React, { useReducer, useEffect } from 'react';
import '../uiComponent/ui.css';
import { Images } from '../Images';
import { DefaultImg } from '../Images';
import { Flip } from 'react-awesome-reveal';

type Actions =
  | { type: 'INITIAL_RENDER' }
  | { type: 'CARD_CLICKED', index: number };


interface RedCards {
  id: number,
  imgUrl?: string,
  open?: boolean,
}

interface IState {
  mCards: RedCards[],
  clickedCardId: Array<any>,
  clickedCardCount: number;
}



const initialState: IState = { mCards: [], clickedCardCount: 0, clickedCardId: [] };

const shuffleCards = () => {
  let updatedCards = [];
  for (var i = 0; i < 12; i++) {
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
      let shuffleResult = [];
      shuffleResult = shuffleCards();
      if (shuffleResult) {
        return { ...state, mCards: state.mCards.concat(shuffleResult) };
      }
      return state;
    case 'CARD_CLICKED':
      let value = [...state.mCards];
      value[action.index].open = true;

      let updatedClickedId = [...state.clickedCardId];
      if (updatedClickedId.length === 2) {
        if (value[updatedClickedId[0]].imgUrl !== value[updatedClickedId[1]].imgUrl) {
          value[updatedClickedId[0]].open = false;
          value[updatedClickedId[1]].open = false;
        }
        updatedClickedId.splice(0, 2);
      }

      updatedClickedId.push(action.index);

      return { ...state, mCards: value, clickedCardId: updatedClickedId, clickedCardCount: state.clickedCardCount + 1 };
    default:
      throw new Error();
  }
}





const Uirender: React.FC = () => {
  const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'INITIAL_RENDER' })
  }, []);

  const handleClick = (id: number, isOpen: boolean) => {
    if (!isOpen)
      dispatch({ type: 'CARD_CLICKED', index: id })
  }

  return (


    <div className="container">
      {state.mCards && state.mCards.map((eachCard, i) =>
      <Flip key={eachCard.id}>
        <div>
          <figure className="figure-block">
            <img className="img-block"
              src={eachCard.open ? eachCard.imgUrl : DefaultImg}
              alt="Memory"
              onClick={() => handleClick(i, eachCard.open || false)} />
          </figure>
        </div>
      </Flip>
      )}
    </div>
  );
}
export default Uirender;
