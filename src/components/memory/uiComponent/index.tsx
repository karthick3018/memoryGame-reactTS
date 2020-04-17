import  React,{ useReducer,useEffect } from 'react';
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

interface OrangeCards {
  id: number;
}


 

interface IState {
  mCards: RedCards[],
  // clickedCardId: OrangeCards[],
  clickedCardId: Array<any>,
  clickedCardCount: number;
}

 

const initialState: IState = {mCards: [],clickedCardCount:0,clickedCardId: []};

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
      return  {...state,mCards:value,clickedCardId: [],clickedCardCount:state.clickedCardCount+1};
    default:
      throw new Error();
  }
}





const Uirender: React.FC = () => {
  const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'INITIAL_RENDER' })
  }, []);

  const handleClick = (id: number) => {
    dispatch({ type: 'CARD_CLICKED',index:id })
  }

  return (
  

    <div >
      {console.log('state',state)}
    <p>Ui renders here</p>
    <div className="container" >
    <React.StrictMode>
      {state.mCards && state.mCards.map((eachCard, i) =>
        <figure key={eachCard.id} className="figure-block">
          <img className="img-block"
            src={eachCard.open ? eachCard.imgUrl : DefaultImg}
            alt="Memory"
            onClick={() => handleClick(i)} />
        </figure>
      )}
         </React.StrictMode>
    </div>
  </div>
  );
    }
    export default Uirender;
