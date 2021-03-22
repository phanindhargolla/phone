import React, {useState,useEffect} from 'react';
import './ContactCard.css';
import PhoneIcon from '@material-ui/icons/Phone';
import DeleteIcon from '@material-ui/icons/Delete';
import { Avatar, IconButton } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import EdiText from "react-editext";
import validator from 'validator';
import db from './firebase';


function ContactCard({id, name, phone, tstar, ondeletehandler, users }) {

    const [star, setStar] = useState(tstar);
    const [seed, setSeed] = useState('');
    
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);
    
    useEffect(() => {
        db.ref().child('users').child(id).update({ star: star });
    },[star])

    const handleName = (fname) => {
        db.ref().child('users').child(id).update({ name: fname});
    }
    const handlePhone = phoneno => {
        db.ref().child('users').child(id).update({ phone: phoneno });
     }

    const editname = (name) => {
        if (name === "") {
            return false;
        } else {
            return true;
        }
     }

    const edithandler = (phoneno) => {
        if (!validatePhoneNumber(phoneno)) {
        return false;
    }
        else {
            return true;
      }
   }

    const validatePhoneNumber = (phone) => {
      const isValidPhoneNumber = validator.isMobilePhone(phone)
        return isValidPhoneNumber;
    }
    
    /*    
    const handlePhone = (editname,editphoneno) => {
        console.log(editname);
        if (!validatePhoneNumber(editphoneno)) {
            alert('Enter the correct number');
        } else {
            const editphone = users.filter(({name,phone}) => {
            return editname === name;
            })
            console.log(editphone);
        }
     }
    */
    
    return (
        <div className='contactcard'>
            <div className='contactcard__info'>
                <IconButton onClick={() => star? setStar(false) : setStar(true)}>
                    {    
                    star ? (
                            <StarIcon htmlColor='#f7cb69' />
                    ) : (
                        <StarBorderIcon />    
                    )
                }
            </IconButton>

                <Avatar className='contactcard__avatar'src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                    <EdiText
                    value={name}
                    type="text"
                     saveButtonContent={<strong>Apply</strong>}
                     cancelButtonContent={<strong>Cancel</strong>}
                    onSave={handleName} showButtonsOnHover editButtonContent="Edit"
                    hideIcons={true}
                    validationMessage="Please enter the name"
                    validation={(name) => editname(name)}
                        />
                  </div>
            <div className='card-body contactcard__phone'>
                <PhoneIcon className='contactcard__phoneicon' />
                <EdiText
                    saveButtonContent={<strong>Apply</strong>}
                    cancelButtonContent={<strong>Cancel</strong>}
                    value={phone}
                    type="text" onSave={handlePhone} showButtonsOnHover editButtonContent="Edit"
                    hideIcons={true}
                    validationMessage="Please enter valid ten digit number"
                    validation={phone => edithandler(phone)}
                   />
                 
            </div>
            <div className='contactcard__right'>
            <IconButton onClick={() => ondeletehandler(name)}>
                <DeleteIcon className='contactcard__delete' />
            </IconButton>
            </div>    
        </div>
    )
}

export default ContactCard
