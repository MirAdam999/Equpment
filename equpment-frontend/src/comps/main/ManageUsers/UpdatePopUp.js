

const UpdatePopUp = (props) => {
    const user_id = props.user.id
    const user_name = props.user.name
    const action = props.action

    return (
        <div className="popup">
            <div className="popup-inner">
                <button className='close-btn' onClick={props.onClose}>X</button>
                <div className="user-update-msg">משתמש {user_name}, מספר משתמש {user_id}, {action}</div>
            </div>
        </div>
    )
}

export default UpdatePopUp