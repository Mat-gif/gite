import axios, { AxiosError } from 'axios';
import {Room} from "../../../interface/interface";


export const searchRooms = async (start: string, end: string) => {
    if (!start || !end) {
        throw new Error('Veuillez sélectionner des dates');
    }
    if (start > end) {
        throw new Error('Le début ne peut être avant la fin.');
    }

    try {
        const response = await axios.get<Room[]>(`/api/start/${start}/end/${end}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data || 'Une erreur est survenue.');
        } else {
            throw new Error('Une erreur est survenue.');
        }
    }
}