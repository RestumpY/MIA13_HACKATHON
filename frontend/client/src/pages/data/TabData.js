import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState, useEffect } from 'react';
import AthletesTable from '../../components/data/athelete/Athelete';
import MedalsTable from '../../components/data/medal/Medal';
import HostsTable from '../../components/data/hosts/Hosts';

function TabData() {

    return (
        <Tabs
            defaultActiveKey="athelete"
            id="fill-tab-example"
            className="mb-3"
            fill
        >
            <Tab eventKey="athelete" title="Athlètes">
                <AthletesTable />
            </Tab>
            <Tab eventKey="medal" title="Médailles">
                <MedalsTable/>
            </Tab>
            <Tab eventKey="host" title="Pays d'accueil">
                <HostsTable/>
            </Tab>
            <Tab eventKey="result" title="Résultats">
                filtré par Saison
            </Tab>
        </Tabs>
    );
}

export default TabData;
