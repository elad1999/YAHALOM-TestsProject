import Line from '../Line';
import './Btn.css';



const Btn = (props) => {
    return (
        <div className={`Btn`} onClick={props.onClick} >
            <Line justify="between">
                {props.children}
            </Line>
        </div>
    )
}

export default Btn;