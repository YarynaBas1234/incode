import { Body, H2, PaginationComponent } from 'components';
import { useState } from 'react';
import { useGetCharactersQuery } from 'redux/services/characters/charactersApi';
import { CharacterStatus } from 'redux/services/characters/types';
import { theme, styled } from 'styles';
import { ColorsType } from 'styles/types';

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

const StatusCharacterBadge = styled.span<{ colorvariant: ValueOf<ColorsType> }>`
	display: block;
	width: 9px;
	height: 9px;
	margin-right: 7px;
	border-radius: 50%;
	background-color: ${({ colorvariant }) => colorvariant};
`;

const PaginationComponentContainer = styled.div`
	margin-top: 17px;
	display: flex;
	justify-content: center;
`;

const getStatusCharacterBadge = ({ status }: { status: ValueOf<CharacterStatus> }) => {
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

const Characters = () => {
	const [page, setPage] = useState(1);

	const handlePageChange = (page: number) => {
		setPage(page);
	};

	const { data: charactersData, isLoading: isCharactersDataLoading } = useGetCharactersQuery({ page });

	if (isCharactersDataLoading) return <>Loading...</>;

	return (
		<>
			<CharactersContainer>
				{charactersData?.results.map((item) => (
					<CharacterItem key={item.id}>
						<CharacterImage src={item.image} alt={item.name} />
						<CharacterItemInfo>
							<div>
								<H2>{item.name}</H2>
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
		</>
	);
};

export default Characters;
