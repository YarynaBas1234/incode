import { CharacterTextFieldsId } from 'types/character';
import { IHistoryFilters } from './types';


export const historyFilters: IHistoryFilters[] = [
	{ id: CharacterTextFieldsId.CharacterName, label: 'By Character Name' },
	{ id: CharacterTextFieldsId.CharacterType, label: 'By Character Type' },
	{ id: CharacterTextFieldsId.CharacterStatus, label: 'By Character Status' },
	{ id: CharacterTextFieldsId.CharacterSpecies, label: 'By Character Species' },
	{ id: CharacterTextFieldsId.CharacterGender, label: 'By Character Gender' },
	{ id: CharacterTextFieldsId.LocationName, label: 'By Location Name' },
	{ id: CharacterTextFieldsId.LocationType, label: 'By Location Type' },
	{ id: CharacterTextFieldsId.LocatioDimension, label: 'By Location Dimension' },
	{ id: CharacterTextFieldsId.EpisodeName, label: 'By Episode Name' },
	{ id: CharacterTextFieldsId.Episodes, label: 'By Episodes' },
];
