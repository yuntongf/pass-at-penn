import {noteAdded, noteTrashed} from '../../store/reducers/courses';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { toastSuccess, toastWarn } from '../../services/NotificationServices';
import { RootState } from '../../store/configureStore';

const Note = () => {
    const course = useSelector((store : RootState) => store.entities.current);
    
    let [note, setNote] = useState(course ? course.note : "");
    useEffect(() => {
        if (course) setNote(course.note);
    },[course]);
    
    const dispatch = useDispatch();
    const handleTrash = () => {
        dispatch(noteTrashed({course: course}));
        toastWarn('Note deleted!');
    }

    const handleNote = () => {
        if (!note) toastWarn('Note cannot be empty!');
        else {
            dispatch(noteAdded({course: course, note: note}));
            toastSuccess('Note saved!');
        }
    }

    return (
        <div className="d-flex justify-content-between">
            <div className="col-11 ms-1 me-1">
                <textarea name='note' className='form-control' placeholder='A sticky note for this course!' value={note} onChange={e => setNote(e.currentTarget.value)} />
            </div>
            <div>
                <button onClick={() => handleNote() } className="me-2 btn btn-sm btn-outline-warning" > ✏️ </button>
                {course.note && <button onClick={() => handleTrash()} className="btn btn-sm btn-outline-warning" > 🗑 </button>}
            </div>
        </div>
    );
}

export default Note;