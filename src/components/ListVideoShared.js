import React, { useState } from 'react';
import Youtube from 'react-youtube';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { useQuery, useMutation } from '../hooks';
import queries from '../graphql/queries';

import AddVideoModal from '../components/AddVideoModal';
import ConfirmModal from '../components/common/ConfirmModal';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    padding: 4rem 0 0 0;
`;

const ListVideo = styled.div`
    width: 50%;
`;

const VideoBox = styled.div`
    display: flex;
    background: white;
    border-radius: 6px;
    padding: 12px;
    position: relative;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.106);

    &:not(:first-child) {
        margin-top: 1rem;
    }
`;

const DeleteBtn = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    background: tomato;
    color: white;
    padding: 6px;
    transform: translate(20%, -20%);
    cursor: pointer;
    border-radius: 2px;
`;

const VideoInfo = styled.div`
    display: flex;
    flex-direction: column;
    order: 2;
    padding: 0 1rem;
    height: 200px;
    flex-grow: 1;
`;

const Desc = styled.div`
    font-size: 13px;
    color: rgba(100, 100, 100, 1);
    flex-grow: 1;
    overflow-y: scroll;
`;

const Author = styled.div`
    color: dodgerblue;
    font-size: 14px;
    padding: 12px 0 4px 0;
`;

//main componnet
export default ({ userQueried, modal, toggleModal }) => {
    const opts = {
        height: '100%',
        width: 'auto',
        playerVars: {
            autoplay: 0
        }
    };

    const { data, loading, refetch } = useQuery(queries.query.getAllVideo);
    const [confirm, setConfirm] = useState({
        status: false,
        data: null
    });
    const _handleConfirm = (status, data = null) => () => {
        setConfirm({ status, data });
    };

    if (loading) {
        return <div>Loading videos...</div>;
    }

    const { allVideo } = data.data.getAllVideo;

    const [deleteVideoHook] = useMutation(queries.mutation.deleteVideo);
    const _handleDeleteVideo = _id => () => {
        deleteVideoHook({
            variables: { _id },
            upload: mutationResult => {
                if (mutationResult.data.deleteVideo.success) {
                    _handleConfirm(false, null)();
                    toast('Video has been deleted!');
                    refetch();
                    return;
                }
                toast(`Can't delete video...`);
            }
        });
    };

    return (
        <>
            <Wrapper>
                <ListVideo>
                    {allVideo.length > 0 ? (
                        allVideo.map((video, i) => (
                            <VideoBox key={i}>
                                <Youtube videoId={video.videoId} opts={opts} />
                                <VideoInfo>
                                    <h3 style={{ margin: '0 0 6px 0' }}>
                                        {video.title}
                                    </h3>
                                    <Desc>{video.description}</Desc>
                                    <Author>Shared by {video.email}</Author>
                                </VideoInfo>
                                <DeleteBtn
                                    onClick={_handleConfirm(true, video._id)}
                                >
                                    Delete
                                </DeleteBtn>
                            </VideoBox>
                        ))
                    ) : (
                        <div>No videos here...</div>
                    )}
                </ListVideo>
            </Wrapper>
            {modal && (
                <AddVideoModal
                    toggleModal={toggleModal}
                    email={userQueried.data.data.getUser.user.email}
                    refetchVideoList={refetch}
                />
            )}
            {confirm.status && (
                <ConfirmModal
                    title="Delete video"
                    agreeMessage="Delete"
                    onClose={_handleConfirm(false)}
                    onConfirm={_handleDeleteVideo(confirm.data)}
                >
                    You really want to delete this video?
                </ConfirmModal>
            )}
        </>
    );
};
