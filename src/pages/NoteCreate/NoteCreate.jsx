import { NoteApi } from "api/note-api";
import { NoteForm } from "components/NoteForm/NoteForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNote } from "store/notes/notes-slice";

export const NoteCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submit = async (formValue) => {
        const createdNote = await NoteApi.create({
            ...formValue,
            created_at: new Date().toLocaleDateString(),
        });
        dispatch(addNote(createdNote));
        alert("The note has been created");
        navigate("/");
    };
    return (
        <>
            <NoteForm title={"New Note"} onSubmit={submit} />
        </>
    );
};
