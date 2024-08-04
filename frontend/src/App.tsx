import './App.css';
import React, {useState} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import User from "./user/User";
import Admin from "./admin/Admin";


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
                            <User/>
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
