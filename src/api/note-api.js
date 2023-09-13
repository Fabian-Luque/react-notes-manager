// import axios from "axios";

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
} from "firebase/firestore";
import { FirebaseApp } from "utils/firebase";

// const BASE_URL = "http://localhost:3200/notes";

export class NoteApi {
    static async create(note) {
        // return this.formatId((await axios.post(`${BASE_URL}`, note)).data);
        const response = await addDoc(
            collection(FirebaseApp.db, "notes"),
            note
        );
        return {
            id: response.id,
            ...note,
        };
    }

    static async fetchAll() {
        // return (await axios.get(`${BASE_URL}`)).data.map(this.formatId);
        const q = query(
            collection(FirebaseApp.db, "notes"),
            orderBy("created_at", "asc")
        );
        const response = await getDocs(q);
        return response.docs.map((document) => {
            return {
                id: document.id,
                ...document.data(),
            };
        });
    }

    static async deleteById(noteId) {
        // return (await axios.delete(`${BASE_URL}/${noteId}`)).data;
        deleteDoc(doc(FirebaseApp.db, "notes", noteId));
    }

    static async updateById(id, note) {
        // return this
        // .formatId
        // (await axios.patch(`${BASE_URL}/${id}`, note)).data
        // ();
        const q = doc(FirebaseApp.db, "notes", id);
        await updateDoc(q, note);
        return {
            id,
            ...note,
        };
    }

    // static formatId(note) {
    //     return {
    //         ...note,
    //         id: note.id.toString(),
    //     };
    // }

    static onShouldSyncNotes(onChange) {
        const q = query(collection(FirebaseApp.db, "notes"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const isUserPerformingChange =
                querySnapshot.metadata.hasPendingWrites;
            if (!isUserPerformingChange) {
                onChange();
            }
        });
        return unsub;
    }
}
