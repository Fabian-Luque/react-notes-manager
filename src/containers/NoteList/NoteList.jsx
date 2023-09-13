import { useDispatch } from "react-redux";
import s from "./style.module.css";
import { TextCard } from "components/TextCard/TextCard";
import { useNavigate } from "react-router-dom";
import { NoteApi } from "api/note-api";
import { deleteNote } from "store/notes/notes-slice";

export const NoteList = ({ noteList }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function deleteNote_(note) {
        if (window.confirm("Delete Note ? ")) {
            NoteApi.deleteById(note.id);
            dispatch(deleteNote(note));
        }
    }
    return (
        <div className={`row justify-content-center`}>
            {noteList.map((note) => {
                return (
                    <div
                        key={`note-id` + note.id}
                        className={`${s.card_container}`}
                    >
                        <TextCard
                            title={note.title}
                            subtitle={note.created_at}
                            content={note.content}
                            onClick={() => navigate("/note/" + note.id)}
                            onClickTrash={() => deleteNote_(note)}
                        />
                    </div>
                );
            })}
        </div>
    );
};
