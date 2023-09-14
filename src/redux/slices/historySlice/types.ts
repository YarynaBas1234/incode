import { CharacterTextFieldsId } from 'types/character';

export enum HistoryType {
	Filter = 'filter',
	View = 'view',
	Search = 'search',
}

export interface IHistoryFilters {
	id: CharacterTextFieldsId;
	label: string;
}

export interface IHistory {
	type: HistoryType;
	value?: string;
	filters?: {
		label: string;
		value: string;
	}[];
}

export interface IHistoryInitialState {
	data: IHistory[];
}
