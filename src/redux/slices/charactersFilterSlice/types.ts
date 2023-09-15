import { IObjectCharacterTextFieldsId } from 'types/character';

export interface ICharactersFilterInitialState {
	filters: IObjectCharacterTextFieldsId;
	apply: boolean;
	selectedOptions: string[];
	searchKey: string;
}

export interface IApllyFilterPayload {
	filters: IObjectCharacterTextFieldsId;
	selectedOptions: string[];
}
