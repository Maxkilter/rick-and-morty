import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';

describe('App', () => {
    afterEach(cleanup);

    test('should render header', () => {
        const { getByText } = render(<App />);
        const header = getByText('Find your characters from Rick and Morty anime');
        expect(header).toBeInTheDocument();
    });

    test('should render search characters field with label', () => {
        const { getByLabelText } = render(<App />);
        const searchField = getByLabelText('Find a character');
        expect(searchField).toBeInTheDocument();
    });
});
