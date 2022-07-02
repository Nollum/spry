import { Button, Grid, Header, Icon, Ref } from 'semantic-ui-react';
import { IProject, ITicket, ITicketList } from '../../types';
import BoardCard from './board-card';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import axios, { AxiosResponse } from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import projectAPI from '../../api/project';


const Board = ({ id, board }: IProject) => {
  const { getAccessTokenSilently } = useAuth0();
  const [lists, setLists] = useState<ITicketList[]>(board);

  useEffect(() => {
    setLists([...board]);
  }, [board]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    
    if (!destination) return;

    const items = Array.from(lists);

    const [newOrder] = items.splice(source.index, 1);

    items.splice(destination.index, 0, newOrder);

    const updateOrder = async () => {
      try {
        projectAPI.updateProject(id as string, { newBoard: items }, getAccessTokenSilently);
      } catch (err) {
        console.log(err);
      }
    }
    updateOrder();
    setLists(items);
  };

  const handleTicketCreate = async (listId: string) => {
    try {
      const newTicket = { title: 'New Ticket', description: 'No description', status: 'Not Started' };
      const response: AxiosResponse<IProject> = await projectAPI.updateProject(id, { listId, newTicket }, getAccessTokenSilently);
      setLists(response.data.board);
    } catch (err) {
      console.log(err);
    };
  };

  const handleTicketUpdate = async (listId: string, updatedTicket: ITicket) => {
    try {
      
      // Not the most optimal way to update, but it works
      let [newList] = lists.filter(list => list._id === listId);
      const [newTickets] = newList.tickets.map((ticket, index, array)=> {
        if (ticket._id === updatedTicket._id) {
          array[index] = updatedTicket;
        }
        return array;
      });
      newList = { ...newList, tickets: newTickets };
      let newLists = lists;
      newLists[newLists.indexOf(newList)] = newList;

      const response: AxiosResponse<IProject> = await projectAPI.updateProject(id, { newBoard: newLists }, getAccessTokenSilently);
      setLists(response.data.board);
    } catch (err) {
      console.log(err);
    };
  };

  const handleTicketDelete = async (listId: string, ticketId: string) => {
    try {
      const [newList] = lists.filter(list => list._id === listId);
      const newTickets = newList.tickets.filter(ticket => ticket._id !== ticketId);
      newList.tickets = [...newTickets];
      let newLists = lists;
      newLists[newLists.indexOf(newList)] = newList;
      const response: AxiosResponse<IProject> = await projectAPI.updateProject(id, { newBoard: newLists }, getAccessTokenSilently);
      setLists(response.data.board);
    } catch (err) {
      console.log(err);
    }
  }

  const handleCollectionDelete = async (listId: string) => {
    try {
      const newLists = lists.filter(list => list._id !== listId);
      const response: AxiosResponse<IProject> = await projectAPI.updateProject(id, { newBoard: newLists }, getAccessTokenSilently); 
      setLists(response.data.board);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='collections' direction='horizontal'>
          {(provided, snapshot) => (
            <Ref innerRef={provided.innerRef} {...provided.droppableProps}>
              <Grid className='kboard'>
                {lists.length ? lists.map((list, index) => {
                  return (
                    <Draggable draggableId={list._id} index={index} key={list._id}>
                      {(provided, snapshot) => (
                        <Ref innerRef={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <Grid.Column width={3} className="kboard-card">
                            <BoardCard 
                              type={'ticketList'} 
                              data={list} 
                              handleTicketCreate={handleTicketCreate}
                              handleTicketUpdate={handleTicketUpdate}
                              handleTicketDelete={handleTicketDelete}
                              handleCollectionDelete={handleCollectionDelete}
                            />
                          </Grid.Column> 
                        </Ref>
                      )}
                    </Draggable>
                  )
                }) : <Header className="no-tickets">No Tickets</Header>} 
                 
              </Grid>
            </Ref>
          )}
        </Droppable>
    </DragDropContext>
  );
};

export default Board;