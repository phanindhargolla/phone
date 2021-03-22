import React, {useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
import './ContactBox.css';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

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
                 <PhoneInput
                    placeholder="Phone number"
                    value={phone} defaultCountry='US' 
                    onChange={setPhone} />
                <div className='contactbox__button'>
                    <AddIcon className='contactbox__addicon'/>
                    <button onClick={() => props.handler(name,phone)}>Add</button>
                </div>    
            </div>
        </div>
    )
}

export default ContactBox
