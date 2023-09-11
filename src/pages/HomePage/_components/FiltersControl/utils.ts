import { CharacterFilters, CharacterTextFieldsId } from 'types/character';
import { CharacterFilterTextFieldsType, ICharacterFilterTextFieldItem } from './types';

export const characterFilterOptions = [
	CharacterFilters.Character,
	CharacterFilters.Location,
	CharacterFilters.Episodes,
];

export const characterFilterTextFields: CharacterFilterTextFieldsType = {
	[CharacterFilters.Character]: [
		{ id: CharacterTextFieldsId.CharacterName, label: 'Add Character Name' },
		{ id: CharacterTextFieldsId.CharacterType, label: 'Add Character Type' },
		{ id: CharacterTextFieldsId.CharacterDimension, label: 'Add Character Dimension' },
	],
	[CharacterFilters.Location]: [
		{ id: CharacterTextFieldsId.LocationName, label: 'Add Location Name' },
		{ id: CharacterTextFieldsId.LocationStatus, label: 'Add Location Status' },
		{ id: CharacterTextFieldsId.LocationSpecies, label: 'Add Location Species' },
		{ id: CharacterTextFieldsId.LocationType, label: 'Add Location Type' },
		{ id: CharacterTextFieldsId.LocationGender, label: 'Add Location Gender' },
	],
	[CharacterFilters.Episodes]: [
		{ id: CharacterTextFieldsId.EpisodeName, label: 'Add Episode Name' },
		{ id: CharacterTextFieldsId.Episodes, label: 'Add Episodes' },
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
