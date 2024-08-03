import React, { useState } from 'react';
import DatePicker from "./DatePicker";
import axios, {AxiosError} from "axios";
import { Room, RoomsSearch} from "../App";
import Alert from "./Alert";

interface SearchProps {
    onRoomsUpdate: (roomsSearch?: RoomsSearch) => void;
}

const Search: React.FC<SearchProps> = ({ onRoomsUpdate }) => {
    const [start, setStart] = useState<string>('');
    const [end, setEnd] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [rooms, setRooms] = useState<Room[]>([]);

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!start || !end) {
            setError('Veuillez selectionner des dates');
            return;
        }
        if (start > end) {
            setError('Le début ne peut etre avant la fin.');
            return;
        }
        setError(null);
        try {
            const response = await axios.get(`/api/start/${start}/end/${end}`);
            if (response.data.length>0) {
                setRooms(response.data);
                onRoomsUpdate({rooms, start, end});
            } else {
                setError('Aucune chambre disponibles pour ces dates');
            }
        } catch (error) {
            error instanceof  AxiosError ? setError(error.response?.data): setError("Une erreur est survenue.")
        }
    };

    const handleDateChange = (isStart: boolean) => (date: string) => {
        onRoomsUpdate(undefined);
        isStart ? setStart(date):setEnd(date);

    };

    return (
        <div className="w-50 mx-auto mt-4 ">
            <form onSubmit={handleSearch}>
                {error && <Alert message={error}/>}
                <div className="row d-flex justify-content-center ">
                    <div className="col-auto">
                        <DatePicker onDateChange={handleDateChange(true)} label={"Départ"} />
                    </div>
                    <div className="col-auto">
                        <DatePicker onDateChange={handleDateChange(false) } label={"Arrivée"}/>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">
                            Rechercher
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Search;
