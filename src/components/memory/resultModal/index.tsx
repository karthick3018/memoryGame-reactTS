import * as React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};


interface PropTypes {
  isModalOpen: boolean,
  onClose(event: React.MouseEvent<Element, MouseEvent>):void ,
  title: string,
  renderItems: object
}


const ModalComponent = ({
  isModalOpen,
  onClose,
  title,
  renderItems
}: PropTypes) => {
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel={title}
      >
        {renderItems}
      </Modal>
    </div>
  )
}

export default ModalComponent;

