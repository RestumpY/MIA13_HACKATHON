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
            defaultActiveKey="athelete"
            id="fill-tab-example"
            className="mb-3"
            fill
        >
            <Tab eventKey="athelete" title="Atheletes">
                <AthletesTable />
            </Tab>
            <Tab eventKey="medal" title="Médailles">
                <MedalsTable />
            </Tab>
            <Tab eventKey="host" title="Pays d'accueil">
                filtré par Saison
            </Tab>
            <Tab eventKey="result" title="Résultats">
                filtré par Saison
            </Tab>
        </Tabs>
    );
}

export default TabData;
