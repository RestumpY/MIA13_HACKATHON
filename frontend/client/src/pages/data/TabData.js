import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import medals from '../../medals.json'; // Import direct du fichier JSON
import { useState, useEffect } from 'react';
import AthletesTable from '../../components/data/athelete/Athelete';
import MedalsTable from '../../components/data/medal/Medal';

function TabData() {
    const [medal, setMedal] = useState([]);

    useEffect(() => {
        setMedal(medals); // Utilisation directe des données importées
    }, []);

    return (
        <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3"
            fill
        >
            <Tab eventKey="home" title="Atheles">
                <AthletesTable />
            </Tab>
            <Tab eventKey="profile" title="Médaille">
                <MedalsTable />
            </Tab>
            <Tab eventKey="longer-tab" title="Saison">
                filtré par Saison
            </Tab>
        </Tabs>
    );
}

export default TabData;
