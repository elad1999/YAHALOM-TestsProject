import './Field.css';

const Field = (props) => {
    return (
        <div className="Field" >
            {props.children}
        </div>
    )
}

export default Field;