import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CharacterTextFieldsId } from 'types/character';
import { IApllyFilterPayload, ICharactersFilterInitialState } from './types';

const initialState: ICharactersFilterInitialState = {
	filters: {
		[CharacterTextFieldsId.CharacterName]: '',
		[CharacterTextFieldsId.CharacterType]: '',
		[CharacterTextFieldsId.CharacterStatus]: '',
		[CharacterTextFieldsId.CharacterSpecies]: '',
		[CharacterTextFieldsId.CharacterGender]: '',
		[CharacterTextFieldsId.LocationName]: '',
		[CharacterTextFieldsId.LocationType]: '',
		[CharacterTextFieldsId.LocatioDimension]: '',
		[CharacterTextFieldsId.EpisodeName]: '',
		[CharacterTextFieldsId.Episodes]: '',
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
