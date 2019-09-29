import React from 'react';
import styled from 'styled-components';

import queries from '../graphql/queries';
import { useMutation, useForm } from '../hooks';
import getVideoId from '../utils/youtubeUrlParser';

const Wrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    border-radius: 8px;
    background: white;
    z-index: 100;
    width: 500px;
`;

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Input = styled.input`
    font-size: 14px;
    padding: 4px;
    margin: 2px;
    border: 1px solid rgba(100, 100, 100, 0.4);
    border-radius: 2px;
`;

const TextArea = styled.textarea`
    font-size: 14px;
    padding: 4px;
    margin: 2px;
    border: 1px solid rgba(100, 100, 100, 0.4);
    border-radius: 2px;
`;

const SubmitBtn = styled.button`
    font-size: 15px;
    padding: 4px;
    background: dodgerblue;
    color: white;
    border: none;
    border-radius: 2px;
    margin-top: 6px;
    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const Error = styled.div`
    font-size: 12px;
    color: tomato;
    font-style: italic;
`;

export default ({ toggleModal, email, refetchVideoList }) => {
    const initFeilds = {
        url: {
            value: '',
            error: ''
        },
        title: {
            value: '',
            error: ''
        },
        description: {
            value: '',
            error: ''
        }
    };

    const validations = {
        url: {
            required: true,
            regex: /youtube\.com\/watch\?v=.+/g,
            regexWarning: 'Please enter valid youtube url!'
        },
        title: {
            required: true
        },
        description: {
            required: false
        }
    };

    const [addVideoHook] = useMutation(queries.mutation.addVideo);
    const _onSubmit = ({ url, title, description }) => {
        const videoId = getVideoId(url);
        addVideoHook({
            variables: { email, videoId, title, description },
            upload: mutationResult => {
                if (mutationResult.data.addVideo.success) {
                    refetchVideoList();
                    toggleModal(false)();
                }
            }
        });
    };

    const { state, handleChange, handleSubmit, disable } = useForm(
        initFeilds,
        validations,
        _onSubmit
    );

    return (
        <>
            <Wrapper>
                <Form onSubmit={handleSubmit}>
                    <h4>Share new video as {email}</h4>
                    <Input
                        type="text"
                        name="url"
                        placeholder="https://www.youtube.com/watch?v=ZeJg..."
                        value={state.url.value}
                        onChange={handleChange}
                    />
                    <Error>{state.url.error}</Error>
                    <Input
                        type="text"
                        name="title"
                        placeholder="Video title"
                        value={state.title.value}
                        onChange={handleChange}
                    />
                    <Error>{state.title.error}</Error>
                    <TextArea
                        type="text"
                        name="description"
                        placeholder="Video description"
                        value={state.description.value}
                        onChange={handleChange}
                    />
                    <SubmitBtn type="submit" disabled={disable}>
                        Share video
                    </SubmitBtn>
                </Form>
            </Wrapper>
            <Backdrop onClick={toggleModal(false)} />
        </>
    );
};
