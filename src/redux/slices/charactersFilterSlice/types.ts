import { CharacterTextFieldsId } from 'types/character';

export type ICharactersFilterInnitialState = {
    filters: Record<CharacterTextFieldsId, string>;
    apply: boolean;
};
