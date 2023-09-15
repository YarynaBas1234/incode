import { CharacterFilters, ICharacterTextFieldsId } from 'types/character';

export interface ICharacterFilterTextFieldItem {
	id: ICharacterTextFieldsId;
	label: string;
}

export type CharacterFilterTextFieldsType = Record<CharacterFilters, ICharacterFilterTextFieldItem[]>;
