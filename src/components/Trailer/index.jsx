import { IoPlay } from "react-icons/io5"
import {IoMdClose} from 'react-icons/io'
import Popup from 'reactjs-popup'
import  YouTube from 'react-youtube';

 const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      
      autoplay: 1,
    },
  };

const Trailer = ({trailerKey}) => {
  return (
    <div>
      <Popup
        modal
        trigger={
           <button type="button" className='genreItem1'>
          <div className="flex items-center justify-center"> 
            <IoPlay className='mr-1'/> Trailer
          </div></button> 
        } className="popup-content">
        {close => (
          <div className="modal-container">
            <button
              className="close-button"
              type="button"
              data-testid="closeButton"
              onClick={() => close()}
            >
              <IoMdClose size={20} color="#231f20" />
            </button>
            <div className="video-wrapper">
               <YouTube videoId={trailerKey} opts={opts} />
            </div>
          </div>
        )}
      </Popup>
    </div>
  )
}

export default Trailer
