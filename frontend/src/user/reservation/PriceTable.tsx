import React from 'react';
import {Reservation} from "../../interface/interface";


interface PriceTableProps {
    reservation: Reservation;
}
const PriceTable: React.FC<PriceTableProps> = ({ reservation }) => {


    const nights = (number : number) => {
        return reservation.rooms.length * number ;
    };

    return (
        <div>
            <table className="table">
                <thead className="thead-dark">
                <tr className={"table-active"}>
                    <th scope="col"></th>
                    <th scope="col">Unité</th>
                    <th scope="col">Prix Unitaire (XPF)</th>
                    <th scope="col">Prix (XPF)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">Nuits Semaine</th>
                    <td>{nights(reservation.nightWeek)}</td>
                    <td>{reservation.nightWeekPrice}</td>
                    <td>{nights(reservation.nightWeek)*reservation.nightWeekPrice}</td>
                </tr>
                <tr>
                    <th scope="row">Nuits Weekend</th>
                    <td>{nights(reservation.nightWeekend)}</td>
                    <td>{reservation.nightWeekendPrice}</td>
                    <td>{nights(reservation.nightWeekend)*reservation.nightWeekendPrice}</td>
                </tr>
                <tr>
                    <th scope="row">Lit Parapluie</th>
                    <td>{(reservation.extra ? 1 : 0)*reservation.rooms.length}</td>
                    <td>{reservation.extraPrice}</td>
                    <td>{(reservation.extra ? 1 : 0)*reservation.extraPrice*reservation.rooms.length}</td>
                </tr>
                <tr className={"table-active"}>
                    <th scope="row">Total</th>
                    <td></td>
                    <td></td>
                    <td>{reservation.totalPrice*reservation.rooms.length}</td>
                </tr>
                </tbody>
            </table>
        </div>

    );
};

export default PriceTable;
