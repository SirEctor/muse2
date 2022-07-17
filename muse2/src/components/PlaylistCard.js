import React, { useState } from 'react';

export default function PlaylistCard({ id, songs, handleDeletePlaylist}) {
    function convertNormalUrlToEmbed(url){
        const code = url.slice(url?.indexOf("v=") + "v=".length, url?.indexOf("v=") + "v=".length + 11);
        return(`https://www.youtube.com/embed/${code}`);
    }

    function deleteSong(id){
        setStateSongs(stateSongs.filter(song => song?.id !== id));
    }

    const [stateSongs, setStateSongs] = useState(songs);

    const songVideos = stateSongs.map((song) => {
        return(
            <div className='song-video'>
                <h4 className='song-title-h4'>{song?.title}</h4>
                <iframe 
                    src={song?.source}
                    frameborder="0"
                    allow="encrypted-media"
                    allowfullscreen
                    title="video"
                    width="160"
                    height="90"
                />{" "}
                <button className='delete-button' onClick={() => {deleteSong(song?.id)}}>Delete Song</button>
            </div>
        );
    });


    return (
        <div>
            <div className='card'>
                <h2 className='playlist-title-h2'>My Example Playlist - {id}</h2>
                <input defaultValue="Search for a song..."/>
                <div className='inner-card'>
                    {songVideos}
                </div>
                <button className='add-song-button'>Add Song</button>
                <button className='delete-playlist-button' onClick={() => {handleDeletePlaylist(id)}}>Delete Playlist</button>
            </div>
        </div>
    )
}
