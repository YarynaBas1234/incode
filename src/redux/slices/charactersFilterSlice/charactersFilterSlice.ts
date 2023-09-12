import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CharacterTextFieldsId } from 'types/character';
import { IApllyFilterPayload, ICharactersFilterInitialState } from './types';

const initialState: ICharactersFilterInitialState = {
	filters: {
		[CharacterTextFieldsId.CharacterName]: '',
		[CharacterTextFieldsId.CharacterType]: '',
		[CharacterTextFieldsId.CharacterDimension]: '',
		[CharacterTextFieldsId.LocationName]: '',
		[CharacterTextFieldsId.LocationStatus]: '',
		[CharacterTextFieldsId.LocationSpecies]: '',
		[CharacterTextFieldsId.LocationType]: '',
		[CharacterTextFieldsId.LocationGender]: '',
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
		updateFilters: (state) => {
			state = initialState;
		},
		applyFilters: (state, { payload }: PayloadAction<IApllyFilterPayload>) => {
			const { filters, selectedOptions } = payload;
			const payloadArr = Object.values(filters);

			const isFieldData = payloadArr.some((item) => item.length > 0);

			if (isFieldData) state.apply = true;
			else state.apply = false;

			state.selectedOptions = selectedOptions;
			state.filters = filters;
			return state;
		},
		removeFilters: (state) => {
			state.selectedOptions = initialState.selectedOptions;
			state.filters = initialState.filters;
			state.apply = initialState.apply;
		},
	},
});

export const { applyFilters, removeFilters } = charactersFilterSlice.actions;

export default charactersFilterSlice;
