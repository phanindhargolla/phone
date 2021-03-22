import React from 'react'
import './Contacts.css'
import ContactCard from './ContactCard';
import { DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd';

function Contacts({ users, ondelete,swap,handler}) {
    function handleOnDragEnd(result) {
        swap(result);
};    
    
    return (
        <div className='contacts'>
        <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
             {provided =>
            <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
            {
                users &&
                users.map(({id, name,phone,star},index) => {
                    return (
                        <Draggable key={id} draggableId={name} index={parseInt(index)}>
                            {(provided) =>
                            (
                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                    <ContactCard id={id} name={name} phone={phone} tstar={star} ondeletehandler={ondelete} users={users}/>
                                </div>
                                )
                            }   
                        </Draggable>    
                    )
                })
                            }
                {provided.placeholder}
            </div>  
                    }
             </Droppable>       
        </DragDropContext>
       </div> 
    )
}

export default Contacts
