import './App.css';
import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Client from "./component/Client";
import Admin from "./component/Admin";

export interface Room {
    id: number;
    childNumber: number;
    adultNumber: number;
    name: string;
    description?: string;
}

export interface Reservation {
    rooms : Room[];
    start : string;
    end : string;
    email : string;
    extra : boolean;
    nightWeek : number;
    totalPrice: number;
    nightWeekend: number;
    id?: number;
    nightWeekPrice: number;
    nightWeekendPrice: number;
    extraPrice: number;
}

export interface RoomsSearch{
    rooms : Room[];
    start : string;
    end : string;
}


const App: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const handleSelect = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <div className="App dark-mode p-4">
            <Tabs selectedIndex={selectedIndex} onSelect={handleSelect}>
                <div className="row">
                    <div className="col">
                        <TabList className="nav nav-tabs">
                            <Tab className="nav-item">
                                <a className={`nav-link ${selectedIndex === 0 ? 'active' : ''}`} href="#tab1">
                                    Faire une reservation
                                </a>
                            </Tab>
                            <Tab className="nav-item">
                                <a className={`nav-link ${selectedIndex === 1 ? 'active' : ''}`} href="#tab2">
                                    Infos (Admin)
                                </a>
                            </Tab>
                        </TabList>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <TabPanel>
                            <Client/>
                        </TabPanel>
                        <TabPanel>
                            <Admin/>
                        </TabPanel>
                    </div>
                </div>
            </Tabs>
        </div>
    )
};

export default App;
