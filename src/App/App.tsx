import React, { useCallback, useState } from 'react';
import Character from '../Character';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import { debounce, DebouncedFunc } from 'lodash';
import Notification from '../Notification';
import { useHttps } from '../service';
import './App.scss';

const App = () => {
    const [characters, setCharacters] = useState<null | []>(null);
    const [prevSearchFn, setPrevSearchFn] = useState<DebouncedFunc<(query: string)
        => Promise<void>> | null>(null);
    const [prevQuery, setPrevQuery] = useState('');
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [message, setMessage] = useState('');
    const { isLoading, request, cancelPrevQuery, error, clearError } = useHttps();

    if (error) {
        setMessage(error?.data.error);
        setIsMessageOpen(true);
        clearError();
    }

    const sendQuery = useCallback(
        async (query: string) => {
            setIsMessageOpen(false);
            setPrevQuery(query);

            if (cancelPrevQuery) { return; }

            if (query !== prevQuery) {
                const data = await request(query);
                setCharacters(data);
            }

        }, [cancelPrevQuery, request, prevQuery]
    );

    const searchCharacters = useCallback(
        ({ target: { value } }) => {
            const searchFn = debounce(sendQuery, 500);

            setPrevSearchFn(() => {
                if (prevSearchFn?.cancel) {
                    prevSearchFn.cancel();
                }
                return searchFn;
            });

            value ? searchFn(value) : setCharacters(null);

        }, [sendQuery, prevSearchFn]);

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
        <Notification isOpen={isMessageOpen} message={message}/>
    </div>
    );
};

export default App;
