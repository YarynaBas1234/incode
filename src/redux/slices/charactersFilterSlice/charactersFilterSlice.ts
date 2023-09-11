import { createSlice } from '@reduxjs/toolkit';
import { CharacterTextFieldsId } from 'types/character';
import { ICharactersFilterInnitialState } from './types';

const initialState: ICharactersFilterInnitialState = {
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
};

const charactersFilterSlice = createSlice({
	name: 'charactersFilterSlice',
	initialState,
	reducers: {
		updateFilters: (state) => {
			state = initialState;
		},
		applyFilters: (state) => {
			state = initialState;
		},
		removeFilters: (state) => {
			state.filters = initialState.filters;
			state.apply = false;
		},
	},
});

export const { removeFilters } = charactersFilterSlice.actions;

export default charactersFilterSlice;
