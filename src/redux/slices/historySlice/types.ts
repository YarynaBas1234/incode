import { CharacterTextFieldsId } from "types/character";

export type IHistoryInitialState = {
    profileViews: string[],
    filtersHistory: Record<CharacterTextFieldsId, string>;
};
