import axios from "axios";

const BASE_URL = "http://localhost:3200/notes";

export class NoteApi {
    static async create(note) {
        console.log(note);
        return this.formatId((await axios.post(`${BASE_URL}`, note)).data);
    }

    static async fetchAll() {
        return (await axios.get(`${BASE_URL}`)).data.map(this.formatId);
    }

    static async fetchById(noteId) {
        return this.formatId((await axios.get(`${BASE_URL}/${noteId}`)).data);
    }

    static async deleteById(noteId) {
        return (await axios.delete(`${BASE_URL}/${noteId}`)).data;
    }

    static async updateById(id, note) {
        return this.formatId(
            (await axios.patch(`${BASE_URL}/${id}`, note)).data
        );
    }

    static formatId(note) {
        return {
            ...note,
            id: note.id.toString(),
        };
    }
}
