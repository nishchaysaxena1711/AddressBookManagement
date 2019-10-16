import { handleActions } from 'redux-actions';

export const contactDetails = [];

export default handleActions({
    CREATE_CONTACT_DETAILS: (state, {payload} ) => {
        return [
            ...state,
            payload
        ]
    },
    DELETE_CONTACT_DETAILS: (state, {payload} ) => {
		return state.filter(({ id }) => id !== payload.id);
    }
}, contactDetails);