import { styled, theme } from "styles";
import { ColorsType } from "styles/types";
import { CharacterStatus } from "types/character";

const StatusCharacterBadge = styled.span<{ colorvariant: ValueOf<ColorsType> }>`
	display: block;
	width: 9px;
	height: 9px;
	margin-right: 7px;
	border-radius: 50%;
	background-color: ${({ colorvariant }) => colorvariant};
`;

export const getStatusCharacterBadge = ({ status }: { status: ValueOf<CharacterStatus> }) => {
	switch (status) {
		case CharacterStatus.Alive:
			return <StatusCharacterBadge colorvariant={theme.colors.green} />;
		case CharacterStatus.Dead:
			return <StatusCharacterBadge colorvariant={theme.colors.red} />;
		case CharacterStatus.Unknown:
			return <StatusCharacterBadge colorvariant={theme.colors.gray_1} />;
		default:
			return <StatusCharacterBadge colorvariant={theme.colors.gray_1} />;
	}
};
