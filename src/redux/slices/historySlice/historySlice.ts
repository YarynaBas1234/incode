import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HistoryType, IHistoryInitialState } from './types';
import { CharacterTextFieldsId } from 'types/character';
import { historyFilters } from './utils';
import { localStorageService } from 'storage';

const initialState: IHistoryInitialState = {
	data: [],
};

const historySlice = createSlice({
	name: 'historySlice',
	initialState,
	reducers: {
		visitProfilePage: (state, { payload }: PayloadAction<string>) => {
			state.data.push({ type: HistoryType.View, value: `User saw information about ${payload}` });
			localStorageService.addToLocalStorage('history', JSON.stringify(state.data));
		},
		filtersHistory: (state, { payload }: PayloadAction<Record<CharacterTextFieldsId, string>>) => {
			const filters = Object.entries(payload).reduce<{ label: string; value: string }[]>((acc, [key, value]) => {
				if (value) {
					const filter = historyFilters.find((item) => item.id === key);
					filter && acc.push({ label: filter.label, value });
				}
				return acc;
			}, []);
			state.data.push({
				type: HistoryType.Filter,
				filters,
			});
			localStorageService.addToLocalStorage('history', JSON.stringify(state.data));
		},
	},
});

export const { visitProfilePage, filtersHistory } = historySlice.actions;

export default historySlice;