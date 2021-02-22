import {useState} from 'react';

interface ButtonProps {
    color: string;
    children: string;
}

export function Button(props: ButtonProps) {
    const [counter, setCounter] = useState(1)

    function incrementCounter(){
        setCounter(counter + 1)

    }

    return (
        <button 
        type="button" 
        style={{ backgroundColor: props.color }} 
        onClick={incrementCounter}
        >
            {props.children}

            <strong>{counter}</strong>


        </button>
    );
}