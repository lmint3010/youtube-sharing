import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 400px;
    padding: 1rem;
    background: white;
    border-radius: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
`;

const BackDrop = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
`;

const Title = styled.h4`
    font-size: 24px;
    font-weight: bold;
    padding: 12px 0;
    text-align: center;
    margin: 0;
    border-bottom: 1px solid rgba(100, 100, 100, 0.2);
`;

const Content = styled.p`
    margin: 0;
    padding: 1rem 10px;
    font-size: 13px;
    color: gray;
`;

const Button = styled.button`
    font-size: 14px;
    background: rgba(240, 240, 240, 1);
    padding: 6px 12px;
    border-radius: 4px;
    margin: 6px;
    border: none;

    &.agree {
        background: dodgerblue;
        color: white;
    }
`;

const ButtonBox = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Modal = ({ title, agreeMessage, onClose, onConfirm, children }) => {
    return (
        <>
            <Wrapper>
                <Title>{title}</Title>
                <Content>{children}</Content>
                <ButtonBox>
                    <Button className="agree" onClick={onConfirm}>
                        {agreeMessage}
                    </Button>
                    <Button onClick={onClose}>Cancle</Button>
                </ButtonBox>
            </Wrapper>
            <BackDrop onClick={onClose} />
        </>
    );
};

export default Modal;
