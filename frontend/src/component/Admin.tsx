// src/Alert.tsx

import React, { useState, useEffect } from "react";
import ReservationCard from "./ReservationCard";
import { Reservation } from "../App";
import axios, {AxiosError} from "axios";

interface AdminProps {}

const Admin: React.FC<AdminProps> = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get(`/api/reservations`);
                setReservations(response.data);
            } catch (error) {
                error instanceof  AxiosError ? setError(error.response?.data): setError("Une erreur est survenue.")
            }
        };

        fetchReservations();
    }, []);


    if (error) {
        return <p>Erreur : {error}</p>;
    }

    return (
        <div>
            <div className="text-center">
                <h1>Liste des Réservations</h1>
            </div>
            <ReservationCard reservations={reservations} />
        </div>
    );
};

export default Admin;
