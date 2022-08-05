import React, { useState } from 'react'

export default function SearchInput({ playlists, setCurrentPlaylistId }) {
    const [searchedPlaylists, setSearchedPlaylists] = useState([]); 
    const [searchedSongs, setSearchedSongs] = useState([]);
    
    function handleChange(event){
        console.log(event.target.value);
        if (event.target.value === ""){
            setSearchedPlaylists([]);
            setSearchedSongs([]);
            return;
        };
        const filteredPlaylists = [...playlists].filter(playlist => playlist.title.toLowerCase().includes(event.target.value?.toLowerCase()));
        setSearchedPlaylists(filteredPlaylists.map(playlist => {return {"title": playlist.title, "id": playlist.id}}));
        console.log(searchedPlaylists);

        let filteredSongs = [];
        playlists.map(playlist => {
            playlist.songs.map((song) => {
                if(song.title.toLowerCase().includes(event.target.value?.toLowerCase())){
                    filteredSongs.push({"title" : song.title, "id": playlist.id});
                }
            })
        });
        setSearchedSongs(filteredSongs);
        console.log(filteredSongs);
    }

    return (
    <>
        <input
            id="search-input" 
            variant="outlined" 
            placeholder="Search..." 
            onChange={(event) => handleChange(event)}
        />

        <div className='search-results' style={{zIndex: 10, position:"relative"}}>
            {searchedPlaylists.length > 0 && searchedPlaylists.map((playlist, index) => {
               return(<div key={index} style={{background: "#c3ecd7" , color :"black"}}>
                   <p style={{paddingLeft: "10px", paddingRight:"10px"}}>{playlist.title}</p>
                </div>)
            })}
        
            {searchedSongs.length > 0 && searchedSongs.map((songObject, index) => {
                return(
                    <div key={index} style={{background:"#c3ecf7", color: "black"}}>
                        <p style={{paddingLeft: "10px", paddingRight:"10px"}}>{songObject.title}</p> 
                    </div>
                )
            })}
        </div>
    </>
  )
}
