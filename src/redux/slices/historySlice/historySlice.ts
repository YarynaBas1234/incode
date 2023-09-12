import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IHistoryInitialState } from "./types";
import { CharacterTextFieldsId } from "types/character";

const initialState: IHistoryInitialState = {
    profileViews: [],
	filtersHistory: {
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
	}
};

const historySlice = createSlice({
	name: 'historySlice',
	initialState,
	reducers: {
		visitProfilePage: (state, { payload }: PayloadAction<string>) => {
            state.profileViews.push(`User saw information about ${payload}`);
		},
		filtersHistory: (state, { payload }: PayloadAction<Record<CharacterTextFieldsId, string>>) => {
			state.filtersHistory = payload;
		},
	},
});

export const { visitProfilePage, filtersHistory } = historySlice.actions;

export default historySlice;
