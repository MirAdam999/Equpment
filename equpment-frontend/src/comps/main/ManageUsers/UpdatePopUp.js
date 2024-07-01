

const UpdatePopUp = (props) => {
    const user_id = props.user.id
    const user_name = props.user.name
    const action = props.action

    return (
        <div className="popup-wrappper">
            <div className="popup-inner">
                <button onClick={props.onClose}>X</button>
                <div>משתמש {user_name}, מספר משתמש {user_id}, {action}</div>
            </div>
        </div>
    )
}

export default UpdatePopUp