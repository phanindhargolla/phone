import React from 'react'
import './Contacts.css'
import ContactCard from './ContactCard';
import { DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd';

function Contacts({ users, ondelete,swap }) {
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
                users.map(({name,phone},index) => {
                    return (
                        <Draggable key={name} draggableId={name} index={parseInt(index)}>
                            {(provided) =>
                            (
                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                        <ContactCard name={name} phone={phone} ondeletehandler={ondelete} />
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
