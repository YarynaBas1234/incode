import { useState } from 'react';
import { useGetCharactersQuery } from 'redux/services/characters/charactersApi';
import { styled } from 'styles';

const HomeWrapper = styled.p`
	color: 'red';
`;

const HomePage = () => {
	const [page, setPage] = useState(1);

	const { data: charactersData, isLoading: isCharactersDataLoading } = useGetCharactersQuery({page});

	if (isCharactersDataLoading) return <>Loading...</>;

	return (
		<HomeWrapper>
			Homeeee page
			{charactersData?.info.count}
			<button onClick={() => setPage((prev) => prev - 1)}>prev</button>
			<button onClick={() => setPage((prev) => prev + 1)}>next</button>
		</HomeWrapper>
	);
};

export default HomePage;
