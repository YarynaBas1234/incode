import { CharacterFilters, ICharacterTextFieldsId } from 'types/character';

import { CharacterFilterTextFieldsType, ICharacterFilterTextFieldItem } from './types';

export const characterFilterOptions = [
	CharacterFilters.Character,
	CharacterFilters.Location,
	CharacterFilters.Episodes,
];

export const characterFilterTextFields: CharacterFilterTextFieldsType = {
	[CharacterFilters.Character]: [
		{ id: ICharacterTextFieldsId.CharacterName, label: 'Add Character Name' },
		{ id: ICharacterTextFieldsId.CharacterStatus, label: 'Add Character Status' },
		{ id: ICharacterTextFieldsId.CharacterSpecies, label: 'Add Character Species' },
		{ id: ICharacterTextFieldsId.CharacterType, label: 'Add Character Type' },
		{ id: ICharacterTextFieldsId.CharacterGender, label: 'Add Character Gender' },
	],
	[CharacterFilters.Location]: [
		{ id: ICharacterTextFieldsId.LocationName, label: 'Add Location Name' },
		{ id: ICharacterTextFieldsId.LocationType, label: 'Add Location Type' },
		{ id: ICharacterTextFieldsId.LocatioDimension, label: 'Add Location Dimension' },
	],
	[CharacterFilters.Episodes]: [
		{ id: ICharacterTextFieldsId.EpisodeName, label: 'Add Episode Name' },
		{ id: ICharacterTextFieldsId.Episodes, label: 'Add Episodes' },
	],
};

export const getFilterTextFields = (options: CharacterFilters[]) => {
	return Object.keys(characterFilterTextFields).reduce<ICharacterFilterTextFieldItem[]>((acc, fieldKey) => {
		if (options.indexOf(fieldKey as CharacterFilters) !== -1) {
			acc.push(...characterFilterTextFields[fieldKey as CharacterFilters]);
		}
		return acc;
	}, []);
};
