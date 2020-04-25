import React, { useReducer, useEffect, useState } from 'react';
import { Flip } from 'react-awesome-reveal';
import ModalComponent from '../resultModal';
import { Images } from '../Images';
import { DefaultImg } from '../Images';
import '../uiComponent/ui.css';

type Actions =
  | { type: 'CARD_CLICKED', index: number }
  | { type: 'RESTART' }


interface CardTypes {
  id: number,
  imgUrl?: string,
  open?: boolean,
}

interface IState {
  mCards: CardTypes[],
  clickedCardId: Array<any>,
  clickedCardCount: number;
  resultStatus?: boolean
}


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

const initialState: IState = { mCards: shuffleCards(), clickedCardCount: 0, clickedCardId: [],resultStatus:false };

const checkResult = (cards: Array<CardTypes>) => {
  let value = true;
  cards.map(eachCard => {
    if (eachCard.open === false) {
      value = false;
    }
    return 1;
  })
  if (value) {
    return value
  }

}

const reducer: React.Reducer<IState, Actions> = (state, action) => {
  switch (action.type) {
    
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
      let result = checkResult([...state.mCards]);


      updatedClickedId.push(action.index);

      return { ...state, mCards: value, clickedCardId: updatedClickedId, clickedCardCount: state.clickedCardCount + 1,resultStatus: result };

      case 'RESTART':
        return { mCards: shuffleCards(), clickedCardCount: 0, clickedCardId: [],resultStatus:false };
       
    default:
      throw new Error();
  }
}

const Uirender: React.FC = () => {
  const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, initialState);
  const [isResultOpen ,setIsResultOpen] = useState<boolean>(false);

  useEffect(() => {
    if(state.resultStatus){
      setIsResultOpen(true);
    }
  }, [state.resultStatus])

  const handleClick = (id: number, isOpen: boolean) => {
    if (!isOpen)
      dispatch({ type: 'CARD_CLICKED', index: id })
  }

  const handleModalClose = () => {
   setIsResultOpen(false);
  }

  const handleRestart = () => {
    dispatch({type:'RESTART'})
    handleModalClose();
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

      {state.resultStatus &&
       <ModalComponent
        isModalOpen = { isResultOpen }
        title = { 'Result' }
        onClose = { handleModalClose }
        renderItems = {
          <>
           <h3> Congrats , You Won !</h3>
           <button onClick = { handleRestart } className='button-class'>Restart</button>
          </>
        }
        />
      }
    </div>
  );
}
export default Uirender;
