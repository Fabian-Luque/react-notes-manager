import { configureStore } from "@reduxjs/toolkit";
import { noteReducer } from "store/notes/notes-slice";

export const store = configureStore({
    reducer: {
        notesSlice: noteReducer,
    },
});
