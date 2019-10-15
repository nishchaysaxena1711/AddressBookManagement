import { createAction } from 'redux-actions';

export const fetchContactDetails = createAction('FETCH_CONTACT_DETAILS');
export const fetchedContactDetails = createAction('FETCHED_CONTACT_DETAILS');
export const errorInFetchingContactDetails = createAction('ERROR_IN_FETCHING_CONTACT_DETAILS');

export const createContactDetails = createAction('CREATE_CONTACT_DETAILS');

export const editContactDetails = createAction('EDIT_CONTACT_DETAILS');