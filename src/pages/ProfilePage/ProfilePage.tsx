import { ICharacter } from 'interfaces';
import { styled } from 'styles';

const ProfileWrapper = styled.p`
	color: 'red';
`;

interface ProfilePageProps {
	character: ICharacter;
}

const ProfilePage: React.FC<ProfilePageProps> = (props) => {
	const { character } = props;

	return (
		<div>
			<ProfileWrapper>Profile page</ProfileWrapper>
			<p>{character.name}</p>
		</div>
	);
};

export default ProfilePage;
