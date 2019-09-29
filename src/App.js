import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { ContextProvider } from './components/common/context';
import Navbar from './components/Navbar';
import ListVideoShared from './components/ListVideoShared';

import { useQuery } from './hooks';
import queries from './graphql/queries';

toast.configure({
    autoClose: 2000
});

const App = () => {
    const [modal, setModal] = useState(false);
    const _toggleModal = status => () => setModal(status);

    const userQueried = useQuery(queries.query.getUser);

    if (userQueried.loading) {
        return <div>Loading...</div>;
    }

    return (
        <ContextProvider>
            <div>
                <Navbar toggleModal={_toggleModal} userQueried={userQueried} />
                <ListVideoShared
                    modal={modal}
                    toggleModal={_toggleModal}
                    userQueried={userQueried}
                />
            </div>
        </ContextProvider>
    );
};

export default App;
