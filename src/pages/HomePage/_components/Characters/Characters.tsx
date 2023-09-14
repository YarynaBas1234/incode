import { Body, EmptyState, FabButton, H2, Loader, PaginationComponent, getStatusCharacterBadge } from 'components';
import { RoutePathConst } from 'consts';
import { Link } from 'react-router-dom';
import { theme, styled } from 'styles';
import { ICharacter } from 'types/character';

interface CharactersProps {
	pages?: number | null;
	data?: ICharacter[];
	page: number;
	setPage: (page: number) => void;
	isError?: boolean;
	isLoading?: boolean;
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
	const { data, pages, page, setPage, isError, isLoading } = props;

	const handlePageChange = (page: number) => {
		setPage(page);
	};

	if (isLoading) return <Loader />;

	if (!data || isError) return <EmptyState />;
	
	return (
		<>
			<CharactersContainer>
				{data.map((item, key) => (
					<CharacterItem key={key}>
						<CharacterImage src={item.image} alt={item?.name} />
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
									{item.location?.name}
								</Body>
							</div>
							<div>
								<Body color={theme.colors.gray_1} fontWeight={500}>
									First seen in:
								</Body>
								<Body color={theme.colors.white} fontSize='18px'>
									{item.origin?.name}
								</Body>
							</div>
						</CharacterItemInfo>
					</CharacterItem>
				))}
			</CharactersContainer>
			{pages && pages > 1 && (
				<PaginationComponentContainer>
					<PaginationComponent pages={pages} page={page} onChange={handlePageChange} />
				</PaginationComponentContainer>
			)}
			<FabButton />
		</>
	);
};

export default Characters;
