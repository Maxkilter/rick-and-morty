import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Character from './Character';

describe('Character', () => {
    afterEach(cleanup);

    const mockProps = {
        name: 'Rick Sanchez',
        imageUrl: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        species: 'Human',
        status: 'Alive'
    };

    test('should render a character\'s card fields', () => {
        const { getByText } = render(<Character {...mockProps} />);
        const name = getByText(mockProps.name);
        const species = getByText(`species: ${mockProps.species}`);
        const status = getByText(`status: ${mockProps.status}`);

        expect(name).toBeInTheDocument();
        expect(species).toBeInTheDocument();
        expect(status).toBeInTheDocument();
    });
});
