import './App.css';
import React, {useState} from "react";
import DatePicker from "./component/DatePicker";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import RoomCard from "./component/RoomCard";

export interface Room {
    id: number;
    childNumber: number;
    adultNumber: number;
    name: string;
    description?: string;
}


const App: React.FC = () => {
    const [start, setStart] = useState<string>('');
    const [end, setEnd] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
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
        setLoading(true);
        setError(null);
        const apiUrl = `/api/start/${start}/end/${end}`;
        console.log('Making request to:', apiUrl); // Ajoutez ce log pour vérifier l'URL

        try {
            const response = await axios.get(apiUrl);
            setRooms(response.data);
        } catch (error) {
            setError('Une erreur inattendue est survenue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <div>
                <h1 className="text-center">Calédo-Gite</h1>
            </div>

            <div className="w-50 mx-auto mt-4">
                <form onSubmit={handleSearch}>
                    <div className="row d-flex justify-content-center ">
                        <div className="col">
                            <DatePicker label="Arrivé " onDateChange={setStart}/>
                        </div>
                        <div className="col">
                            <DatePicker label="Départ " onDateChange={setEnd}/>
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-primary">
                                Rechercher
                            </button>
                        </div>
                    </div>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p className="text-danger">{error}</p>}
            </div>
            <div className={"w-50 mx-auto mt-4"}>
            <div className={"row d-flex justify-content-center"}>
                    {rooms.length > 0 && (
                        <div className="mt-4 ">
                            <h2>Chambres disponibles du {start} au {end}</h2>
                            <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
                                {rooms.map((room) => (
                                   <RoomCard room={room}/>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
