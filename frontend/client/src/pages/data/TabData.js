import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState, useEffect } from 'react';
import AthletesTable from '../../components/data/athelete/Athelete';
import MedalsTable from '../../components/data/medal/Medal';
import HostsTable from '../../components/data/hosts/Hosts';
import ResultsTable from '../../components/data/results/Results';

function TabData() {

    return (
        <Tabs
            defaultActiveKey="athlete"
            id="fill-tab-example"
            className="tabs"
            fill
        >
            <Tab eventKey="athlete" title="Athlètes">
                <AthletesTable />
            </Tab>
            <Tab eventKey="medal" title="Médailles">
                <MedalsTable />
            </Tab>
            <Tab eventKey="host" title="Pays d'accueil">
                <HostsTable />
            </Tab>
            <Tab eventKey="results" title="Résultats">
                <ResultsTable />
            </Tab>
        </Tabs>
    );
}

export default TabData;
