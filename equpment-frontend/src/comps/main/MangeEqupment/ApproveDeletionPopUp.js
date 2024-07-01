

const ApproveDeletionPopUp = (props) => {
    const sucsess = props.sucsess

    if (sucsess) {
        return (
            <div>
                <button onClick={props.onClose}>X</button>
                <p className="sucsess-msg">{props.deletion_msg}</p>
            </div>
        )
    }
    else {
        return (

            <div>
                <button onClick={props.onClose}>X</button>
                <p>{props.question}</p>
                <div>
                    <button onClick={props.onClose}>בטל</button>
                    <button onClick={props.onDelete}>מחק</button>
                </div>
            </div>
        )
    }
}

export default ApproveDeletionPopUp