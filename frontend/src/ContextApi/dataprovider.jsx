import React, { createContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [companyDetails, setCompanyDetails] = useState([]);

    return (
        <DataContext.Provider value={{ companyDetails, setCompanyDetails }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
