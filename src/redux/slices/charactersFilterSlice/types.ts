import { CharacterTextFieldsId } from 'types/character';

export interface ICharactersFilterInitialState {
	filters: Record<CharacterTextFieldsId, string>;
	apply: boolean;
	selectedOptions: string[];
}

export interface IApllyFilterPayload {
	filters: Record<CharacterTextFieldsId, string>;
	selectedOptions: string[];
}
