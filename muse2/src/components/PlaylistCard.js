import React, { useState } from 'react';
import SongModal from "./SongModal";

export default function PlaylistCard({ playlists, id, songs, handleDeletePlaylist, setPlaylists}) {
    function deleteSong(songsId){
        const thisPlaylist = playlists[playlists.findIndex(playlist => playlist?.id === id)];
        
        console.log(playlists);
        const removedSongFromPlaylist = {
                "id": id, 
                "title": thisPlaylist.title,
                "songs": thisPlaylist.songs.filter(song => song?.id !== songsId)
            }
        

        const copyOfPlaylists = [...playlists];
        copyOfPlaylists[playlists.findIndex(playlist => playlist?.id === id)] = removedSongFromPlaylist;
        console.log(copyOfPlaylists);
        setPlaylists(copyOfPlaylists);
     }

    
    const songVideos = songs.map((song) => {
        return(
            <div className='song-video' key={song?.id}>
                <h4 className='song-title-h4'>{(song?.title.length < 20) ? song?.title : song?.title.slice(0,17).concat("...")}</h4>
                <iframe 
                    src={song?.source}
                    frameBorder="0"
                    allow="encrypted-media"
                    allowFullScreen
                    title="video"
                    width="160"
                    height="90"
                />{" "}
                <button className='delete-button' onClick={() => {deleteSong(song?.id)}}>Delete Song</button>
            </div>
        );
    });

    const [show, setShow] = useState(false);
    
    function showModal() {
        setShow(true);
    } 

    function onClose(){
        setShow(false);
    }

    return (
        <div>
            <SongModal className={"song-modal"} show={show} onClose={onClose} songs={songs} playlists={playlists} setPlaylists={setPlaylists} currentInd={playlists.findIndex(playlist => playlist?.id === id)}/>
            {!show && (<div className='card'>
                <h2 className='playlist-title-h2'>{playlists[playlists.findIndex(playlist => playlist?.id === id)]?.title}</h2>
                <input defaultValue="Search for a song..."/>
                <div className='inner-card'>
                    {songVideos}
                </div>
                <button className='add-song-button' onClick={() => showModal()}>Add Song</button>
                <button className='delete-playlist-button' onClick={() => {handleDeletePlaylist(id)}}>Delete Playlist</button>
            </div>)}
        </div>
    )
}
