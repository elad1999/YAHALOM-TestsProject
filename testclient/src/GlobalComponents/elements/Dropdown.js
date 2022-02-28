import { useState,  useRef } from 'react';
import { Line } from '..';
import "./Dropdown.css";

const Dropdown = (props) => {
    //state
    const [isOpen, setIsOpen] = useState(false);
    const wrapTag = useRef();

   

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const handleItemSelect = (item) => {
        if (props.onChange) {
            props.onChange(item.id);
            handleToggle();
        }
    }

    //render
    const renderListItems = () => {
        return props.list.map(i => {
            return <div key={i.id} onClick={() => handleItemSelect(i)}>{i.value}</div>
        })
    }

    const renderList = () => {
        if (isOpen) {
            return (
                <div className="list">
                    {renderListItems()}
                </div>
            )
        }
        return null;
    }

    const renderTrigger = () => {
        if (props.selected) {
            const item = props.list.find(i => i.id === props.selected);
            if (item) {
                return item.value;
            }
        }
        return 'please select';
    }

    return (
        <div className="Dropdown" ref={wrapTag}>
            <div className="trigger" onClick={handleToggle}>
                <Line justify="between">
                    <div>{renderTrigger()}</div>
                </Line>
            </div>
            {renderList()}
        </div>
    )
}

export default Dropdown;