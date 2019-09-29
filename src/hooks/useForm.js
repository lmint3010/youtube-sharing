import { useState, useEffect } from 'react';

const useForm = (initValue, validations, onSubmit) => {
    const [state, setState] = useState(initValue);
    const [disable, setDisable] = useState(true);

    const checkError = (value, validator) => {
        if (validator.required && value === '') {
            return validator.requiredWarning || 'This field is required!';
        }
        if (validator.regex) {
            return validator.regex.exec(value)
                ? ''
                : validator.regexWarning || 'Invalid value';
        }
        return '';
    };

    const handleChange = event => {
        const { value, name } = event.target;
        setState({
            ...state,
            [name]: { value, error: checkError(value, validations[name]) }
        });
    };

    useEffect(() => {
        const isDirty =
            Object.keys(state).filter(key => {
                if (validations[key].required && state[key].value === '')
                    return true;
                return state[key].error !== '';
            }).length !== 0;
        setDisable(isDirty);
    }, [state, validations]);

    const handleSubmit = event => {
        event.preventDefault();
        const dataSubmitFromState = Object.keys(state).reduce((object, key) => {
            object[key] = state[key].value;
            return object;
        }, {});
        onSubmit(dataSubmitFromState);
    };

    return { state, handleChange, handleSubmit, disable };
};
export default useForm;
