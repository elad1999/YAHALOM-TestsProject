import "./Input.css";

const Input = (props) => {
    return (
        <div className="Input" type={props.type}>
            <input
                value={props.value}
                onChange={props.onChange}
                type={props.type || 'text'}
                placeholder={props.placeholder} 
                name={props.name}               
                checked={props.checked}        
                onClick={props.onClick}                                       
            /> 
            {props.indicator?<div className="indicator" color={props.indicator?"green":"red"}/>:""}
        </div>
    )
}

export default Input;