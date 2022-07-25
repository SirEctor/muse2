import React, { useEffect, useState } from 'react';
import './App.css';
import SearchInput from './components/SearchInput';
import PlaylistCard from './components/PlaylistCard';
import PlaylistModal from './components/PlaylistModal';


function App() {
  const [playlists, setPlaylists] = useState(JSON.parse(localStorage.getItem('muse2-playlists')) || []);
  const [currentPlaylistId, setCurrentPlaylistId] = useState(JSON.parse(localStorage.getItem('muse2-currentPlaylistId')) ||null);

 useEffect(() => {
  localStorage.setItem("muse2-playlists", JSON.stringify(playlists));
 }, [playlists]);

 useEffect(() => {
  localStorage.setItem("muse2-currentPlaylistId", JSON.stringify(currentPlaylistId));
 }, [currentPlaylistId]);

  function handleDeletePlaylist(id){
    const currentPlaylistIndex = playlists.findIndex(playlist => playlist?.id === id);

    if(playlists.length === 0){
      setCurrentPlaylistId(null);
      return;
    }else if(playlists.length === 1){
      const deleteUpdatePlaylist = playlists.filter(playlist => playlist?.id !== id);
      setPlaylists(deleteUpdatePlaylist);
      setCurrentPlaylistId(null);
    }else if(currentPlaylistIndex !== 0){
      setCurrentPlaylistId(playlists[currentPlaylistIndex - 1]?.id);
      const deleteUpdatePlaylist = playlists.filter(playlist => playlist?.id !== id);

      setPlaylists(deleteUpdatePlaylist);
    }else{
      setCurrentPlaylistId(playlists[1]?.id);
      const deleteUpdatePlaylist = playlists.filter(playlist => playlist?.id !== id);

      setPlaylists(deleteUpdatePlaylist);
    }
  }

  

  function handleLeft(){
    if(currentPlaylistId === null){
      return;
    }
    
    const currentPlaylist = playlists.filter(playlist => playlist?.id === currentPlaylistId)[0];

    if(playlists.findIndex(playlist => playlist?.id === currentPlaylist?.id) !== 0){
      setCurrentPlaylistId(playlists[playlists.findIndex(playlist => playlist?.id === currentPlaylist?.id) - 1]?.id);
    }

    return;
  }

  
  function handleRight(){
    if(currentPlaylistId === null){
      return;
    }
    
    const currentPlaylist = playlists.filter(playlist => playlist?.id === currentPlaylistId)[0];

    if(playlists.findIndex(playlist => playlist?.id === currentPlaylist?.id) !== (playlists.length - 1)){
      setCurrentPlaylistId(playlists[playlists.findIndex(playlist => playlist?.id === currentPlaylist?.id) + 1]?.id);
    }

    return;
  }

  const playlistsElements = playlists.map((playlist) => {
    if(currentPlaylistId === playlist?.id){
      return(
        <PlaylistCard key={playlist?.id} playlists={playlists} id={playlist?.id} songs={playlist?.songs} handleDeletePlaylist={handleDeletePlaylist} setPlaylists={setPlaylists}/>
      )
    }
    return null;
  });

  const [playlistShow, setPlaylistShow] = useState(false);



  return (
    <div className="App">
      <header className="App-header">
        {<div className="homepage">  
          <div className='search-and-arrows'>
            <div>
                <SearchInput playlists={playlists}/>
            </div>
            <div className='arrow-playlist-arrow'>
              <button id="left-arrow-button" onClick={() => {handleLeft()}}>{String.fromCharCode(8592)}</button> 
              <PlaylistModal className={"playlist-modal"} currentPlaylistIndex={playlists.findIndex(playlist => playlist?.id === currentPlaylistId)} playlistShow={playlistShow} setPlaylistShow={setPlaylistShow} playlists={playlists} setPlaylists={setPlaylists}  setCurrentPlaylistId={setCurrentPlaylistId}/>
              {!playlistShow && playlistsElements}
              <button id="right-arrow-button" onClick={() => {handleRight()}}>{String.fromCharCode(8594)}</button>
            </div>
          </div> 
          <button id="add-new-playlist-button" onClick={() => {setPlaylistShow(true)}}>Add New Playlist +</button>
        </div>}
      </header>
    </div>
  );
}

export default App;
