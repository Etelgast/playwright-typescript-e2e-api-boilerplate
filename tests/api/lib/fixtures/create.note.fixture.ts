import { APIRoutes } from "../utils/APIRoutes";

export async function createNote(API, token, note) {
    try {
        const createNoteResponse = await API.postRequest(APIRoutes.Notes, note, token);
        const createdNote = await createNoteResponse.json();
        return createdNote.data;
      } catch (error) {
        throw new Error("Error creating note: " + error.message);
      }
  }