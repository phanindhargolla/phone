import './App.css';
import Header from './components/Header';
import ContactBox from './components/ContactBox';
import Contacts from './components/Contacts';
import { useState } from 'react';
import validator from 'validator';
import { formatPhoneNumber } from 'react-phone-number-input';
import React, {useEffect} from 'react';
import db from './components/firebase';

function App() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => { 
    db.ref('users/').on('value', data => {
      if (data.val() != null) {
        let obj = data.val();
        let objects = Object.keys(obj).map(key => {
          return {
            id: key,
            name: obj[key].name,
            phone: obj[key].phone
          }
        });
        setUsers(objects);
      }
    });
  }, [])

   const swaphandler = (result) =>
   {
     if (!result.destination) { return; }
        const items = Array.from(users);
        const [reordereditem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reordereditem);
        setUsers(items);
   }
  
  /*
  const handleChange = (name, phone) => {
  
    const duplicate = users.filter((user) => {
      return user.name === name;
    });
    console.log(phone);
    let patt = new RegExp("^[0-9]{12}$");
    let res = patt.test(phone);
    if (!res) {
       alert('Please enter the correct ten digit Phone number')
     } else if (duplicate.length > 0) {
       alert('Contact is already added')
     } else { 
       setUsers([...users, {
        name: name,
         phone: "(" + phone.slice(0, 3) + ") " + phone.slice(3,6) + " " + phone.slice(6,10)
       }]);
     }
  }
  */
  
  const validatePhoneNumber = (phone) => {
      const isValidPhoneNumber = validator.isMobilePhone(phone)
        return (isValidPhoneNumber)
      }

  const handleChange = (name, phone) => {
    /*
    const duplicate = users.filter((user) => {
      return user.phone === phone;
    });
    */
    
    const duplicate = (fphone) => {
      const user = users.findIndex(({ id, name, phone }) => {
        return phone === formatPhoneNumber(fphone);
      })
      return user;
    }

    if (!validatePhoneNumber(phone)) {
      alert('Enter the correct number');
    } else if (name === "") {
      alert('Enter the name');
    } else if (duplicate(phone) !== -1) {
      alert('Contact is alreay saved');
    }else {
      setUsers([...users, {
        name: name,
        phone: formatPhoneNumber(phone)
      }]);
      db.ref().child('users').push().set({ name: name, phone: formatPhoneNumber(phone) });
      /*
      let ref = db.ref('users');
      ref.orderByChild('name').on('child_added', (snap) => {
        setUsers(snap.val());
      });
      */
    }
  }
   const deleterecord = (fname) => {
        setUsers(users.filter((user) => {
            return user.name !== fname;
        }));
     const namelist= users.find(({id,name,phone}) => {
       return fname === name;
     })
     db.ref('users/').child(namelist.id).remove();
   }
  

  return (
    <div className="App">
      <Header />
      <ContactBox value={users} handler={handleChange} />
      <Contacts users={users} ondelete={deleterecord} swap={swaphandler} />
    </div>
  );
}

export default App;