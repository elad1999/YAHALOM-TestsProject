
import { Btn, Input, Line } from '../GlobalComponents';

const Answer = (props) => {
    return (
        <Line className='Answer' >             
               <Btn height="small" onClick={props.onRemove}>X</Btn> <Input value={props.content} onChange={props.onChange}></Input>
               <Input type={props.type} name="answers"  value={props.content} isChecked={props.selected} onChange={props.onSelect}></Input>
        </Line>
    )
}

export default Answer;