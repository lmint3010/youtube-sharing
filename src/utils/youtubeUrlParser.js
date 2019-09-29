export default url => {
    const regex = /watch\?v=.+/g;
    const regexResult = regex.exec(url);
    if (regexResult) {
        return regexResult[0].split('=')[1];
    }
    return '';
};
