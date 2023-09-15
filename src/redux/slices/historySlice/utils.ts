import { ICharacterTextFieldsId } from 'types/character';

import { IHistoryFilters } from './types';

export const historyFilters: IHistoryFilters[] = [
	{ id: ICharacterTextFieldsId.CharacterName, label: 'By Character Name' },
	{ id: ICharacterTextFieldsId.CharacterType, label: 'By Character Type' },
	{ id: ICharacterTextFieldsId.CharacterStatus, label: 'By Character Status' },
	{ id: ICharacterTextFieldsId.CharacterSpecies, label: 'By Character Species' },
	{ id: ICharacterTextFieldsId.CharacterGender, label: 'By Character Gender' },
	{ id: ICharacterTextFieldsId.LocationName, label: 'By Location Name' },
	{ id: ICharacterTextFieldsId.LocationType, label: 'By Location Type' },
	{ id: ICharacterTextFieldsId.LocatioDimension, label: 'By Location Dimension' },
	{ id: ICharacterTextFieldsId.EpisodeName, label: 'By Episode Name' },
	{ id: ICharacterTextFieldsId.Episodes, label: 'By Episodes' },
];
