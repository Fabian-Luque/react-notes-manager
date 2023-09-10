import { NoteApi } from "api/note-api";
import { NoteForm } from "components/NoteForm/NoteForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNote, updateNote } from "store/notes/notes-slice";

export const Note = () => {
    const { noteId } = useParams();
    const [isEditable, setIsEditable] = useState(false);
    const note = useSelector((store) =>
        store.notesSlice.noteList.find((note) => note.id === noteId)
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const submit = async (formValues) => {
        const updatedNote = await NoteApi.updateById(note.id, formValues);
        dispatch(updateNote(updatedNote));
        setIsEditable(false);
    };

    async function deleteNote_() {
        if (window.confirm("Delete Note ? ")) {
            NoteApi.deleteById(noteId);
            dispatch(deleteNote(note));
            navigate("/");
        }
    }
    return (
        <>
            {note && (
                <NoteForm
                    isEditable={isEditable}
                    title={isEditable ? "Edit Note" : note.title}
                    note={note}
                    onClickEdit={() => setIsEditable(!isEditable)}
                    onClickDelete={deleteNote_}
                    onSubmit={isEditable && submit}
                />
            )}
        </>
    );
};
