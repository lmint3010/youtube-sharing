import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { useMutation } from '../hooks';
import queries from '../graphql/queries';

import { useForm } from '../hooks';

const Wrapper = styled.div`
    display: flex;
    position: fixed;
    justify-content: flex-end;
    top: 0;
    left: 0;
    right: 0;
    padding: 12px;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
`;

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;

const Input = styled.input`
    font-size: 12px;
    height: 16px;
    outline: none;
    padding: 4px;
    border: 1px solid rgba(100, 100, 100, 0.12);
`;

const Welcome = styled.div`
    font-size: 13px;
    padding: 4px;
`;

const SubmitBtn = styled.button`
    border: none;
    background: dodgerblue;
    color: white;
    font-size: 13px;
    cursor: pointer;
    margin: 0 2px;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const Error = styled.div`
    position: absolute;
    top: 104%;
    font-size: 12px;
    color: tomato;
`;

export default ({ toggleModal, userQueried }) => {
    const initFields = {
        email: { value: '', error: '' },
        password: { value: '', error: '' }
    };

    const validations = {
        email: {
            required: true,
            regex: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g,
            regexWarning: 'Invalid email address'
        },
        password: {
            required: true
        }
    };

    const { state, handleChange, disable } = useForm(
        initFields,
        validations,
        () => {}
    );

    const [loginHook] = useMutation(queries.mutation.login);
    const _handleLogin = () => {
        localStorage.removeItem('utubvideotoken');
        loginHook({
            variables: {
                email: state.email.value,
                password: state.password.value
            },
            upload: mutationResult => {
                const { login } = mutationResult.data;
                if (login.success) {
                    localStorage.setItem('utubvideotoken', login.token);
                    userQueried.refetch();
                } else {
                    toast(login.error);
                }
            }
        });
    };

    const [registerHook] = useMutation(queries.mutation.addUser);
    const _handleRegister = () => {
        registerHook({
            variables: {
                email: state.email.value,
                password: state.password.value
            },
            upload: mutationResult => {
                if (mutationResult.data.addUser.success) {
                    toast('Account created successfully!');
                }
                toast(mutationResult.data.addUser.error);
            }
        });
    };

    const _handleLogout = () => {
        localStorage.removeItem('utubvideotoken');
        userQueried.refetch();
    };

    if (userQueried.data.data.getUser.success) {
        return (
            <>
                <Wrapper>
                    <Welcome>
                        Welcome{' '}
                        <b>{userQueried.data.data.getUser.user.email}</b>
                    </Welcome>
                    <SubmitBtn onClick={toggleModal(true)}>
                        Share a video
                    </SubmitBtn>
                    <SubmitBtn onClick={_handleLogout}>Log out</SubmitBtn>
                </Wrapper>
            </>
        );
    }

    return (
        <>
            <Wrapper>
                <InputBox>
                    <Input
                        type="text"
                        name="email"
                        placeholder="email"
                        value={state.email.value}
                        onChange={handleChange}
                    />
                    <Error>{state.email.error}</Error>
                </InputBox>
                <InputBox>
                    <Input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={state.password.value}
                        onChange={handleChange}
                    />
                    <Error>{state.password.error}</Error>
                </InputBox>
                <SubmitBtn onClick={_handleLogin} disabled={disable}>
                    Login
                </SubmitBtn>
                <SubmitBtn onClick={_handleRegister} disabled={disable}>
                    Register
                </SubmitBtn>
            </Wrapper>
        </>
    );
};
