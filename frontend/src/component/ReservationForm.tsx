
import React, {useState} from 'react';
import {Room,Reservation} from "../App";
import axios, {AxiosError} from "axios";
import Alert from "./Alert";


interface ReservationFormProps {
    roomsSelected: Room[];
    start : string;
    end : string;
    onReservationCalculate: (reservation: Reservation) => void;

}



const ReservationForm: React.FC<ReservationFormProps> = ({ roomsSelected, start,end,onReservationCalculate }) => {
    const [email, setEmail] = useState<string>('');
    const [isCheck, setIsCheck] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsCheck(event.target.checked);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!email) {
            setError('Veuillez saisir un email.');
            return;
        }
        setError(null);

        try {
            const response = await axios.post<Reservation>(`/api/calculate/reservation`,
                {
                    rooms: roomsSelected,
                    start: new Date(start),
                    end :new Date(end),
                    email: email,
                    extra : isCheck
                });
            onReservationCalculate(response.data)
        } catch (error) {
            error instanceof  AxiosError ? setError(error.response?.data): setError("Une erreur est survenue.")
        }
    };


    return (
        <div className={"row w-75 d-flex justify-content-center text-center mt-4 pb-4"}>
            <h2>Information complémentaire</h2>

            <form onSubmit={handleSubmit}>
                {error && <Alert message={error}/>}
                <div className="row mt-4 d-flex justify-content-center">
                    <div className="col-auto">
                        <label className="visually-hidden" htmlFor="emailInput">Email</label>
                        <div className="input-group">
                            <div className="input-group-text">@</div>
                            <input
                                id="emailInput"
                                className="form-control"
                                type="email"
                                placeholder="mon@email.com"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="option"
                                checked={isCheck}
                                onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor="option">
                                Option lit parapluie
                            </label>
                        </div>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">
                            Calculer le tarif
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ReservationForm;
