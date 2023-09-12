import React, { useEffect } from 'react';
import { Body, FabButton, H2, Loader, getStatusCharacterBadge } from 'components';
import PageWrapper from 'components/PageWrapper';
import { useParams } from 'react-router-dom';
import { useGetCharacterQuery } from 'redux/services/characters/charactersApi';
import { styled, theme } from 'styles';
import { useAppDispatch } from 'redux/hooks';
import { visitProfilePage } from 'redux/slices/historySlice';

const ProfileWrapper = styled.div`
	padding: 80px 0;
	background-color: ${theme.colors.black_1};
	min-height: 900px;
`;

const ProfileContainer = styled.div`
	display: flex;
	border-radius: 9px;
	overflow: hidden;
`;

const ProfileImage = styled.img`
	width: 600px;
	oblect-fit: cover;
`;

const ProfileInfo = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 12px 20px 12px 40px;
	background-color: ${theme.colors.gray};
`;

const StatusCharacterContainer = styled.div`
	display: flex;
	align-items: center;
	text-transform: capitalize;
`;

const OtherInfo = styled.div`
	margin-top: 10px;
`;

const ProfilePage = () => {
	const dispatch = useAppDispatch();

	const { id: characterId } = useParams();

	if (!characterId) return null;

	const { data: character, isLoading: isCharacterDataLoading } = useGetCharacterQuery({ id: +characterId });

	useEffect(() => {
		if (character?.name) {
			dispatch(visitProfilePage(character.name));
		}
	}, [character]);

	if (isCharacterDataLoading) return <Loader />;

	if (!character) return null;

	return (
		<ProfileWrapper>
			<PageWrapper>
				<>
					<ProfileContainer>
						<ProfileImage src={character.image} alt={character.name} />
						<ProfileInfo>
							<div>
								<H2>{character.name}</H2>
								<StatusCharacterContainer>
									{getStatusCharacterBadge({ status: character.status })}
									<Body>{`${character.status} - ${character.species}`}</Body>
								</StatusCharacterContainer>
							</div>
							<div>
								<Body color={theme.colors.gray_1} fontWeight={500} fontSize='15px'>
									Last known location:
								</Body>
								<Body color={theme.colors.white} fontSize='18px'>
									{character.location.name}
								</Body>
							</div>
							<div>
								<Body color={theme.colors.gray_1} fontWeight={500}>
									First seen in:
								</Body>
								<Body color={theme.colors.white} fontSize='18px'>
									{character.origin.name}
								</Body>
							</div>
							<OtherInfo>
								<Body color={theme.colors.gray_1} fontWeight={500}>
									Other Info
								</Body>
								<Body color={theme.colors.white} fontSize='18px'>
									{character.gender}
								</Body>
							</OtherInfo>
						</ProfileInfo>
					</ProfileContainer>
					<FabButton />
				</>
			</PageWrapper>
		</ProfileWrapper>
	);
};

export default ProfilePage;
