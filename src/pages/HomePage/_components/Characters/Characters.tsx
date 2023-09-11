import { Body, FabButton, H2, PaginationComponent, getStatusCharacterBadge } from 'components';
import { RoutePathConst } from 'consts';
import { Link } from 'react-router-dom';
import { ICharactersResponse } from 'redux/services/characters/types';
import { theme, styled } from 'styles';

interface CharactersProps {
	charactersData?: ICharactersResponse;
	page: number;
	setPage: (page: number) => void;
}

const CharactersContainer = styled.div`
	padding-top: 20px;
	display: flex;
	gap: 26px;
	flex-wrap: wrap;
`;

const CharacterItem = styled.div`
	width: calc(50% - 13px);
	border-radius: 9px;
	display: flex;
	overflow: hidden;
`;

const CharacterImage = styled.img`
	width: 230px;
	oblect-fit: cover;
`;

const CharacterItemInfo = styled.div`
	padding: 12px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: ${theme.colors.gray};
`;

const StatusCharacterContainer = styled.div`
	display: flex;
	align-items: center;
	text-transform: capitalize;
`;

const PaginationComponentContainer = styled.div`
	margin-top: 17px;
	display: flex;
	justify-content: center;
`;

const LinkStyled = styled(Link)`
	text-decoration: none;
`;

const Characters: React.FC<CharactersProps> = (props) => {
	const { charactersData, page, setPage } = props;

	const handlePageChange = (page: number) => {
		setPage(page);
	};

	if (!charactersData) return null;

	return (
		<>
			<CharactersContainer>
				{charactersData?.results.map((item) => (
					<CharacterItem key={item.id}>
						<CharacterImage src={item.image} alt={item.name} />
						<CharacterItemInfo>
							<div>
								<LinkStyled to={RoutePathConst.Profile + item.id} aria-label='h2'>
									<H2>{item.name}</H2>
								</LinkStyled>
								<StatusCharacterContainer>
									{getStatusCharacterBadge({ status: item.status })}
									<Body>{`${item.status} - ${item.species}`}</Body>
								</StatusCharacterContainer>
							</div>
							<div>
								<Body color={theme.colors.gray_1} fontWeight={500} fontSize='15px'>
									Last known location:
								</Body>
								<Body color={theme.colors.white} fontSize='18px'>
									{item.location.name}
								</Body>
							</div>
							<div>
								<Body color={theme.colors.gray_1} fontWeight={500}>
									First seen in:
								</Body>
								<Body color={theme.colors.white} fontSize='18px'>
									{item.origin.name}
								</Body>
							</div>
						</CharacterItemInfo>
					</CharacterItem>
				))}
			</CharactersContainer>
			<PaginationComponentContainer>
				<PaginationComponent pages={charactersData?.info.pages} page={page} onChange={handlePageChange} />
			</PaginationComponentContainer>
			<FabButton />
		</>
	);
};

export default Characters;
