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

export enum CharacterTextFieldsId {
	CharacterName = 'character-name',
	LocationName = 'location-name',
	EpisodeName = 'episode-name',
	LocationStatus = 'location-status',
	LocationSpecies = 'location-species',
	CharacterType = 'character-type',
	LocationType = 'location-type',
	CharacterDimension = 'character-dimension',
	LocationGender = 'location-gender',
	Episodes = 'episodes',
}

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
