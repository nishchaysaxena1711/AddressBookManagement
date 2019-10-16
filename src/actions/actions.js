import { createAction } from 'redux-actions';

export const fetchContactDetails = createAction('FETCH_CONTACT_DETAILS');
export const deleteContactDetails = createAction('DELETE_CONTACT_DETAILS');
export const createContactDetails = createAction('CREATE_CONTACT_DETAILS');
export const editContactDetails = createAction('EDIT_CONTACT_DETAILS');