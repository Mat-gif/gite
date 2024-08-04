import React, { useState } from 'react';
import DatePicker from "./DatePicker";
import Alert from "../../share-component/Alert";
import {searchRooms} from "./service/searchService";
import Button from "../../share-component/Button";
import {Room, RoomsSearch} from "../../interface/interface";

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
        setError(null);
        try {
            const rooms = await searchRooms(start, end);
            setRooms(rooms);
            if (rooms.length > 0) {
                onRoomsUpdate({ rooms, start, end });
            } else {
                setError('Aucune chambre disponible pour ces dates');
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleDateChange = (isStart: boolean) => (date: string) => {
        onRoomsUpdate(undefined);
        isStart ? setStart(date):setEnd(date);

    };

    return (
        <div className="w-50 mx-auto mt-4 ">
            <div className={"mb-4 text-center"}>
                Nous sommes fermés le lundi ! Par conséquent, aucune arrivée n'est possible le lundi et aucun départ n'est possible le mardi. Si vous séjournez plusieurs semaines, vous serez dans l'obligation de quitter les lieux le lundi pour revenir le mardi, et la nuit du lundi au mardi ne sera pas comptée dans le tarif.
            </div>
            <form onSubmit={handleSearch}>
                {error && <Alert message={error}/>}
                <div className="row d-flex justify-content-center ">
                    <div className="col-auto">
                        <DatePicker onDateChange={handleDateChange(true)} label={"Départ"} isStart={true}/>
                    </div>
                    <div className="col-auto">
                        <DatePicker onDateChange={handleDateChange(false)} label={"Arrivée"} isStart={false}/>
                    </div>
                    <div className="col-auto">
                        <Button message={"Rechercher"} type={"submit"}/>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Search;
