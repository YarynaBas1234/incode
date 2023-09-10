import { CharacterFilters, CharacterTextFieldsId } from 'types/character';

export interface ICharacterFilterTextFieldItem {
	id: CharacterTextFieldsId;
	label: string;
}
export type CharacterFilterTextFieldsType = Record<CharacterFilters, ICharacterFilterTextFieldItem[]>;
