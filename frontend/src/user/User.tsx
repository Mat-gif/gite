// src/Alert.tsx
import React, {useState} from 'react';
import Search from "./search/Search";
import SearchResult from "./reservation/SearchResult";
import {RoomsSearch} from "../interface/interface";
import CarouselCustom from "./carousel/CarouselCustom";


const User: React.FC = () => {
    const [roomsSearch, setRoomsSearch] = useState<RoomsSearch>();

    const handleRoomsUpdate = (roomsSearch?: RoomsSearch) => {
        setRoomsSearch(roomsSearch);
    };


    const handleReservationConfirmed = () => {
        setRoomsSearch(undefined);
    };

    return (
        <div>
            <div className="pt-4">
                <h1 className="text-center">Calédo-Gite</h1>
            </div>
            <Search onRoomsUpdate={handleRoomsUpdate}/>
            <div className={"w-75 mx-auto mt-4"}>
                <div className={"row d-flex justify-content-center align-items-center"}>
                    {roomsSearch !== undefined && (
                        <SearchResult roomsSearch={roomsSearch} onReservationConfirmed={handleReservationConfirmed}/>)}
                </div>
                <div className={"row d-flex justify-content-center text-center mt-4"}>
                    {roomsSearch === undefined && (<div style={{ width: "800px" }}><CarouselCustom/></div>)}
                </div>
            </div>
        </div>
    );
};

export default User;
