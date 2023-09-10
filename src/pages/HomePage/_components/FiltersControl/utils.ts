import { CharacterFilters, CharacterTextFieldsId } from 'types/character';
import { CharacterFilterTextFieldsType, ICharacterFilterTextFieldItem } from './types';

export const characterFilterOptions = [
	CharacterFilters.Character,
	CharacterFilters.Location,
	CharacterFilters.Episodes,
];

export const characterFilterTextFields: CharacterFilterTextFieldsType = {
	[CharacterFilters.Character]: [
		{ id: CharacterTextFieldsId.Name, label: 'Add Name' },
		{ id: CharacterTextFieldsId.Type, label: 'Add Type' },
		{ id: CharacterTextFieldsId.Dimension, label: 'Add Dimension' },
	],
	[CharacterFilters.Location]: [
		{ id: CharacterTextFieldsId.Name, label: 'Add Name' },
		{ id: CharacterTextFieldsId.Status, label: 'Add Status' },
		{ id: CharacterTextFieldsId.Species, label: 'Add Species' },
		{ id: CharacterTextFieldsId.Type, label: 'Add Type' },
		{ id: CharacterTextFieldsId.Gender, label: 'Add Gender' },
	],
	[CharacterFilters.Episodes]: [
		{ id: CharacterTextFieldsId.Name, label: 'Add Name' },
		{ id: CharacterTextFieldsId.Episodes, label: 'Add Episodes' },
	],
};

export const getFilterTextFields = (options: CharacterFilters[]) => {
	return options.reduce<ICharacterFilterTextFieldItem[]>((acc, option) => {
		characterFilterTextFields[option].forEach((item) => {
			if (!acc.some((elem) => elem.id === item.id)) {
				acc.push(item);
			}
		});
		return acc;
	}, []);
};
