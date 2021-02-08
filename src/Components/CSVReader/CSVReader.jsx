import React, { useCallback } from 'react';
import ReactCSVReader from 'react-csv-reader';
import { adaptCSVData } from '../../adapter';

const CSV_EXTENSION = 'csv';

export const CSVReader = ({ setData, handleError = () => ({}) }) => {
    const handleForce = useCallback((data, fileInfo) => {
        const fileExt = fileInfo.name.slice(-3);

        if (fileExt === CSV_EXTENSION) {
            setData(adaptCSVData(data))
        } else {
            handleError();
        }
    }, [setData]);

    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };

    return (
        <ReactCSVReader
            cssClass="react-csv-input"
            label="Select CSV"
            onFileLoaded={handleForce}
            parserOptions={papaparseOptions}
            onError={(r) => console.log(r)}
        />
    );
};
