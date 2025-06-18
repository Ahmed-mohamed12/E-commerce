import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export default function PlusMinus(props) {
    const [btn, setBtn] = useState(1);

    useEffect(() => {
        if(props.count){

            setBtn(props.count); // تعيين btn إلى القيمة الحالية أو 1 إذا لم تكن موجودة
        }
    }, [props.count]);

    const handleIncrement = () => {
        setBtn(prev => prev + 1);
    };

    const handleDecrement = () => {
        setBtn(prev => (prev > 1 ? prev - 1 : 1)); // تأكد من أن btn لا يقل عن 1
    };

    useEffect(() => {
        props.setCount(btn);
        if(props.changCount){
            props.changCount(props.id,btn)
        }
    }, [btn]);

    return (
        <div className="text-center">
            <ButtonGroup className='d-flex gap-5'>
                <Button variant="success" onClick={handleIncrement}>+</Button>
                <h1 className='rounded'>{btn}</h1> {/* استخدم btn هنا بدلاً من props.count */}
                <Button variant="danger" onClick={handleDecrement}>-</Button>
            </ButtonGroup>
        </div>
    );
}