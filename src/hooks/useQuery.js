import { useState } from 'react';
import axios from 'axios';
import api from '../api';

const useQuery = (query, { variables = {} } = {}) => {
    const [state, setState] = useState({
        data: null,
        loading: true
    });

    const runQuery = async () => {
        const queryResult = await axios.post(
            api.baseurl,
            JSON.stringify({ query, variables }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: localStorage.getItem('utubvideotoken') || ''
                }
            }
        );
        setState({ data: queryResult.data, loading: false });
    };
    if (state.loading && !state.data) runQuery();

    const refetch = () => setState({ data: null, loading: true });

    const { data, loading } = state;
    return { data, loading, refetch };
};

export default useQuery;
