import React, { useState } from 'react';
import './App.css';
import PlaylistCard from './components/PlaylistCard';
import {v4 as uuid} from "uuid";

function App() {
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylistId, setCurrentPlaylistId] = useState(null);

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

  function handleAddPlaylist(){
    const newPlaylist = {
      id: uuid(),
      songs: []
    };
    
    const updatedPlaylist = [...playlists, newPlaylist];
    setPlaylists(updatedPlaylist);
    console.log(updatedPlaylist);
    setCurrentPlaylistId(newPlaylist?.id);
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
        <PlaylistCard key={playlist?.id} id={playlist?.id} songs={playlist?.songs} handleDeletePlaylist={handleDeletePlaylist}/>
      )
    }
    return null;
  });

  return (
    <div className="App">
      <header className="App-header">
        <div className='arrow-playlist-arrow'>
          <button id="left-arrow-button" onClick={() => {handleLeft()}}>{String.fromCharCode(8592)}</button> 
          {playlistsElements}
          <button id="right-arrow-button" onClick={() => {handleRight()}}>{String.fromCharCode(8594)}</button>
        </div> 
        <button id="add-new-playlist-button" onClick={() => {handleAddPlaylist()}}>Add New Playlist +</button>
      </header>
    </div>
  );
}

export default App;
