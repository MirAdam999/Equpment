

const ApproveDeletionPopUp = (props) => {
    const sucsess = props.sucsess

    if (sucsess) {
        return (
            <div className="popup">
                <div className="popup-inner">
                    <button className="close-btn" onClick={props.onClose}>X</button>
                    <p className="sucsess-msg" id='approve-aqup-popup-msg'>{props.deletion_msg}</p>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="popup">
                <div className="popup-inner" id='approve-delete-aqup-popup'>
                    <p>{props.question}</p>
                    <div>
                        <button id='deletion-cancel-cat' onClick={props.onClose}>בטל</button>
                        <button id='deletion-approve-cat' onClick={props.onDelete}>{props.action}</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ApproveDeletionPopUp