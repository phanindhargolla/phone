import React, {useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
import './ContactBox.css';

function ContactBox(props) {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <div className='contactbox'>
            <div className='contactbox__header'>
                <h2>Add New Contact</h2>
            </div>  
            <div className='contactbox__body'>
                <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
               <input type='text' placeholder='' value={phone} onChange={(e) => setPhone(e.target.value)} />
                <div className='contactbox__button'>
                    <AddIcon className='contactbox__addicon'/>
                    <button onClick={() => props.handler(name,phone)}>Add</button>
                </div>    
            </div>
        </div>
    )
}

export default ContactBox
