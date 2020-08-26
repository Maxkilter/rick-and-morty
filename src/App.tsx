import React, { useState } from 'react';
import './App.scss';
import { useHttps } from './https.hook';
import Character from './Character';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';

import NotificationEmitter from './notification-emitter';

const App = () => {
    const { isLoading, request, error, clearError } = useHttps();
    const [characters, setCharacters] = useState<null | []>(null);
    const [isMessageOpen, setIsMessageOpen] = useState(false);

    if (error) {
        setIsMessageOpen(true);
        setCharacters(null);
        clearError();
    }

    const searchCharacters = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsMessageOpen(false);
        const query = e.target.value;

        if (query === '') {
            setCharacters([]);
            return;
        }

        const data = await request(`https://rickandmortyapi.com/api/character/?name=${query}`, 'GET');

        if (data?.results) {
            return setCharacters(data.results);
        }
    };

    return (
    <div className="App">
      <header className="App-header">
          Find your characters from Rick and Morty anime
      </header>
        <div className="Search-field">
            <TextField
                id="search-field"
                type="string"
                variant="filled"
                placeholder="Type character name"
                color="secondary"
                label="Find a character"
                size="medium"
                fullWidth={true}
                onChange={searchCharacters}
            />
        </div>
        {
          isLoading ? (
              <div className="Progress-bar">
                  <LinearProgress />
              </div>
              ) : (
                  <div className="Characters-container">
                  {
                      characters?.map(character => {
                          const { name, image, species, status, id } = character;
                          return (
                              <Character
                                  key={id}
                                  name={name}
                                  imageUrl={image}
                                  species={species}
                                  status={status}
                              />
                          );
                      })
                  }
                  </div>
          )
        }
        <NotificationEmitter isOpen={isMessageOpen} />
    </div>
    );
};

export default App;
