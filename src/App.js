import React, { useState, useEffect } from 'react';
import { CSVReader } from './Components/CSVReader/CSVReader';
import { Table } from './Components/Table/Table';

import './App.css'


const App = () => {
    const [users, setUsers] = useState({});
    const [error, setError] = useState(false);
    const [validationError, setValidationError] = useState(false);

    useEffect(() => {
        if (users.rows) {
            const hasError = users.rows.some((row) => {
                return Object.keys(row).some((key) => !key.valid)
            });
            setValidationError(hasError);
        }
    }, [users]);
    console.log(validationError)

    return (
        <div>
            {error && <h1>Error</h1>}
            <CSVReader
                setData={(data) => {
                    setUsers(data);
                    setError(false);
                }}
                handleError={() => setError(true)}
            />
            <Table data={users} />
        </div>
    );
};

export default App;
