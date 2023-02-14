import React, {ReactElement} from 'react'

const Popup = ({trigger, handleClick,children}: {trigger: boolean, handleClick: ()=>void ,children: ReactElement}) => {
  return trigger? (
    <div className="popup">
        <div className="popup-container">
            <button className="close-btn" onClick={handleClick}>&times;</button>
            {children}
        </div>
    </div>
  ): <></>
}

export default Popup