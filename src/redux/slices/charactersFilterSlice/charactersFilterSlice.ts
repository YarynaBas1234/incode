import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICharacterTextFieldsId } from 'types/character';

import { IApllyFilterPayload, ICharactersFilterInitialState } from './types';

const initialState: ICharactersFilterInitialState = {
	filters: {
		[ICharacterTextFieldsId.CharacterName]: '',
		[ICharacterTextFieldsId.CharacterType]: '',
		[ICharacterTextFieldsId.CharacterStatus]: '',
		[ICharacterTextFieldsId.CharacterSpecies]: '',
		[ICharacterTextFieldsId.CharacterGender]: '',
		[ICharacterTextFieldsId.LocationName]: '',
		[ICharacterTextFieldsId.LocationType]: '',
		[ICharacterTextFieldsId.LocatioDimension]: '',
		[ICharacterTextFieldsId.EpisodeName]: '',
		[ICharacterTextFieldsId.Episodes]: '',
	},
	searchKey: '',
	apply: false,
	selectedOptions: [],
};

const charactersFilterSlice = createSlice({
	name: 'charactersFilterSlice',
	initialState,
	reducers: {
		applyFilters: (state, { payload }: PayloadAction<IApllyFilterPayload>) => {
			const { filters, selectedOptions } = payload;
			const isFieldData = Object.values(filters).some((item) => item.length > 0);

			return { ...state, selectedOptions, filters, apply: Boolean(isFieldData) };
		},
		applySearch: (_, { payload }: PayloadAction<string>) => {
			return { ...initialState, searchKey: payload };
		},
		removeFilters: () => initialState,
	},
});

export const { applyFilters, removeFilters, applySearch } = charactersFilterSlice.actions;

export default charactersFilterSlice;
