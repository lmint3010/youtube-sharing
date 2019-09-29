export default {
    query: {
        getUser: `
            query GetUser {
                getUser {
                    success
                    error
                    user {
                        email
                    }
                }
            }
        `,
        getAllVideo: `
            query GetAllVideo {
                getAllVideo {
                    success
                    allVideo {
                        _id
                        email
                        videoId
                        title
                        description
                    }
                }
            }
        `
    },
    mutation: {
        login: `
            mutation UserLogin($email: String!, $password: String!) {
                login(user: {email: $email, password: $password}) {
                    success
                    token
                    error
                }
            }   
        `,
        addUser: `
            mutation AddUser($email: String!, $password: String!) {
                addUser(user: { email: $email, password: $password }) {
                    success
                    error
                    user {
                        email
                    }
                }
            }
        `,
        addVideo: `
            mutation AddVideo($email: String!, $videoId: String!, $title: String!, $description: String) {
                addVideo(video: { email: $email, videoId: $videoId, title: $title, description: $description }) {
                    success
                    error
                    video {
                        email
                        videoId
                        title
                        description
                    }
                }
            }
        `,
        deleteVideo: `
            mutation DeleteVideo($_id: String!) {
                deleteVideo(video: {_id: $_id}) {
                    success
                    error
                }
            }
        `
    }
};
