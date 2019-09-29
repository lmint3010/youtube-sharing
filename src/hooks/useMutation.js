// import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';

const useMutation = query => {
    const runQuery = async ({ variables, upload: callback }) => {
        const mutationResult = await axios.post(
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
        callback(mutationResult.data);
    };

    return [runQuery];
};

export default useMutation;
