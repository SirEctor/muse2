import React, { useState } from 'react'
import {v4 as uuid} from "uuid";

export default function PlaylistModal({currentPlaylistIndex, playlistShow, setPlaylistShow, playlists, setPlaylists, setCurrentPlaylistId }) {
    const [title, setTitle] = useState("");

    function handleChange(event){
        setTitle(event.target.value);
    }

    function onClose(){
        if(playlists.length){
            setCurrentPlaylistId(playlists[currentPlaylistIndex]?.id);
        }else{
            setCurrentPlaylistId(null);
        }

        setPlaylistShow(false);
    }

    function handleAddPlaylist(){
        const newPlaylist = {
          "id": uuid(),
          "title": title,
          "songs" : []
        };
        
        const updatedPlaylist = [...playlists, newPlaylist];
        setPlaylists(updatedPlaylist);
        setCurrentPlaylistId(newPlaylist?.id);

        setTitle("");
        setPlaylistShow(false);
        
    }
    
    
    if(playlistShow){
        return(
            <div className='modal'>
                <h3>Create A New Playlist:</h3>
                <div>
                    <form onSubmit={() => {handleAddPlaylist()}}>
                    <label className="title-label">
                        {"Title: "}
                        <input name="title" type={"text"} value={title} onChange={handleChange} />
                    </label>
                    </form>
                    <input type="submit" id="song-submit-button" value="Submit" onClick={() => handleAddPlaylist()}/>
                    <button id="song-close-button" onClick={() => onClose()}>Cancel</button>
                </div>
            </div>  
        )
    }else{
        return(null)
    }

}
