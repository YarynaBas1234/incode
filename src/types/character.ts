export enum CharacterStatus {
	Alive = 'Alive',
	Unknown = 'unknown',
	Dead = 'Dead',
}

export enum CharacterFilters {
	Character = 'Character',
	Location = 'Location',
	Episodes = 'Episodes',
}

export enum ICharacterTextFieldsId {
	CharacterName = 'character-name',
	CharacterStatus = 'character-status',
	CharacterType = 'character-type',
	CharacterSpecies = 'character-species',
	CharacterGender = 'character-gender',
	LocationName = 'location-name',
	LocationType = 'location-type',
	LocatioDimension = 'location-dimension',
	EpisodeName = 'episode-name',
	Episodes = 'episodes',
}

export type IObjectCharacterTextFieldsId = Record<ICharacterTextFieldsId, string>

export interface ICharacter {
	id: number;
	name: string;
	status: CharacterStatus;
	species: string;
	type: string;
	gender: string;
	origin: {
		name: string;
		url: string;
	};
	location: {
		name: string;
		url: string;
	};
	image: string;
	episode: string[];
	url: string;
	created: string;
}
