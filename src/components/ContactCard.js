import React, {useState} from 'react';
import './ContactCard.css';
import PhoneIcon from '@material-ui/icons/Phone';
import DeleteIcon from '@material-ui/icons/Delete';
import { Avatar, IconButton } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import EdiText from "react-editext";

function ContactCard({ name, phone, ondeletehandler }) {

    const [star, setStar] = useState(false);
    
     const handleSave = value => {
         console.log(value);
        };

    return (
        <div className='contactcard'>
            <div className='contactcard__info'>
                <Avatar className='contactcard__avatar'/>
                    <EdiText
                    value={name}
                    type="text"
                    onSave={handleSave}
                        />
                <IconButton onClick={() => star? setStar(false) : setStar(true)}>
                {
                    star ? (
                        <StarIcon htmlColor='#f7cb69' />
                    ) : (
                        <StarBorderIcon />    
                    )
                }
            </IconButton>
            </div>
            <div className='card-body contactcard__phone'>
            <PhoneIcon className='contactcard__phoneicon'/>
                  <EdiText
                             value={phone}
                             type="text"
                             onSave={handleSave} 
                   />
            </div>
            <div className='contactcard__right'>
            <IconButton>
                <DeleteIcon className='contactcard__delete' onClick={() => ondeletehandler(name)}/>
            </IconButton>
            </div>    
        </div>
    )
}

export default ContactCard
