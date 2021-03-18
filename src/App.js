import './App.css';
import Header from './components/Header';
import ContactBox from './components/ContactBox';
import Contacts from './components/Contacts';
import { useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
 
   const swaphandler = (result) =>
   {
     if (!result.destination) { return; }
        const items = Array.from(users);
        const [reordereditem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reordereditem);
        setUsers(items);
  }

  const handleChange = (name, phone) => {
  
    const duplicate = users.filter((user) => {
      return user.name === name;
    });
    
    let patt = new RegExp("^[0-9]{10}$");
    let res = patt.test(phone.trim());
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

   const deleterecord = (name) => {
        setUsers(users.filter((user) => {
            return user.name !== name;
        }));
   }
  

  return (
    <div className="App">
      <Header />
      <ContactBox value={users} handler={handleChange} />
      <Contacts users={users} ondelete={deleterecord} swap={swaphandler}/>
    </div>
  );
}

export default App;
