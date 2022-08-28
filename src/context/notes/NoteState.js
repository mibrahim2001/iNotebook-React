import NoteContext from './noteContext';
import { useState } from 'react';


const NoteState = (props) =>{
const initialNotes = [
  {
    _id: "630a1fbbe042d47857001320",
    user: "630a075cc427f6fffd0ba5ce",
    title: "My Title",
    description: "Please wake up early",
    tag: "ToDo",
    date: "2022-08-27T13:44:27.479Z",
    __v: 0,
  },
  {
    _id: "630b0f996fcf23b40fa0668a",
    user: "630a075cc427f6fffd0ba5ce",
    title: "Brush Teeth",
    description: "Wake up and brush your teeth",
    tag: "ToDo",
    date: "2022-08-28T06:47:53.817Z",
    __v: 0,
  },
  {
    _id: "630b0f996fcf23b40fa0668a",
    user: "630a075cc427f6fffd0ba5ce",
    title: "Brush Teeth",
    description: "Wake up and brush your teeth",
    tag: "ToDo",
    date: "2022-08-28T06:47:53.817Z",
    __v: 0,
  },
  {
    _id: "630b0f996fcf23b40fa0668a",
    user: "630a075cc427f6fffd0ba5ce",
    title: "Brush Teeth",
    description: "Wake up and brush your teeth",
    tag: "ToDo",
    date: "2022-08-28T06:47:53.817Z",
    __v: 0,
  },
  {
    _id: "630b0f996fcf23b40fa0668a",
    user: "630a075cc427f6fffd0ba5ce",
    title: "Brush Teeth",
    description: "Wake up and brush your teeth",
    tag: "ToDo",
    date: "2022-08-28T06:47:53.817Z",
    __v: 0,
  },
  {
    _id: "630b0f996fcf23b40fa0668a",
    user: "630a075cc427f6fffd0ba5ce",
    title: "Brush Teeth",
    description: "Wake up and brush your teeth",
    tag: "ToDo",
    date: "2022-08-28T06:47:53.817Z",
    __v: 0,
  },
];

const [notes, setNotes] = useState(initialNotes);

    return(
    <NoteContext.Provider value={{notes,setNotes}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;