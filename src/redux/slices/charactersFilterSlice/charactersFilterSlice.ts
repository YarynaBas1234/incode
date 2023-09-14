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

			state.selectedOptions = selectedOptions;
			state.filters = filters;
			state.apply = Boolean(isFieldData);
			return state;
		},
		removeFilters: () => initialState,
	},
});

export const { applyFilters, removeFilters } = charactersFilterSlice.actions;

export default charactersFilterSlice;
