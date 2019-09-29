import React, { useState } from 'react';
// import { useQuery } from '../../hooks';

const Context = React.createContext();
const ContextConsumner = Context.Consumer;

const ContextProvider = props => {
    const [state] = useState({
        auth: {
            status: false
        }
    });

    return <Context.Provider value={state}>{props.children}</Context.Provider>;
};

export { Context, ContextConsumner, ContextProvider };
