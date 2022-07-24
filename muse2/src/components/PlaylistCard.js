import React, { useState, useRef, useEffect } from 'react';
import SongModal from "./SongModal";
import YouTube from 'react-youtube';
import { getIdFromUrl } from '../utilities';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function PlaylistCard({ playlists, id, songs, handleDeletePlaylist, setPlaylists}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlayingIndex, setCurrentPlayingIndex] = useState(undefined);
    const songsRef = useRef([]);

    useEffect(() => {
        songsRef.current = songsRef.current.slice(0, songs.length);
    },[songs]);

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

     const videoParams = {
        height: '90',
        width: '160',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          enablejsapi: 1,
          origin: window.location
        }
    };



    function _onEnd(event){
        console.log("video ended");
        setIsPlaying(false);
        console.log(isPlaying);

        console.log(event.target);
        // if(event.target.src?.includes("?autoplay=1")){
        //     event.target.src = event.target.src.slice(0, -11)
        // }

        console.log("end ci")
        console.log(currentPlayingIndex);

        if(currentPlayingIndex !== undefined){
            //check to see if this is the last song
            //if it's not then set cpi to next, start autoplay with next index
            if(currentPlayingIndex !== playlists[playlists.findIndex(playlist => playlist?.id === id)]?.songs.length - 1){
                startAutoPlay(currentPlayingIndex + 1);
                console.log("autoplay started");
                setCurrentPlayingIndex(currentPlayingIndex + 1);
                
            }
        }
    }

    function _onStateChange(event){
        console.log(event.target);
    }

    function _onPause(){
        console.log("paused");
        setIsPlaying(false);
        setCurrentPlayingIndex(undefined);
    }

    function _onPlay(event){
        console.log( playlists[playlists.findIndex(playlist => playlist?.id === id)].songs);
        console.log("playing");
        console.log(event.target.o.id.slice("iframe-".length));
        setIsPlaying(true);
        const curPlay = playlists[playlists.findIndex(playlist => playlist?.id === id)]?.songs;
        //console.log(curPlay);
        setCurrentPlayingIndex(curPlay.findIndex(song => song?.id == event.target.o.id.slice("iframe-".length)));
        //console.log(curPlay.findIndex(song => song?.id == event.target.o.id.slice("iframe-".length)));
    }

    function _onLoad(event){
        document.getElementById(event.target.o.id).trigger('click');
        console.log("LOADED and CLICKED ONCE!");
        
    }
    
    const [show, setShow] = useState(false);
    
    function showModal() {
        setShow(true);
    } 

    function onClose(){
        setShow(false);
    }

    function startAutoPlay(index){
            if(songs.length === 0) return;
            songsRef.current[index].internalPlayer.playVideo();
            setIsPlaying(true);
            setCurrentPlayingIndex(index);
    }

    function randomizeSongs() {
        const thisPlaylist = playlists[playlists.findIndex(playlist => playlist?.id === id)];
        
        const randomizedThisPlaylist = {
            "id": thisPlaylist.id,
            "title": thisPlaylist.title,
            "songs" : [...thisPlaylist.songs].sort((a,b) => 0.5 - Math.random())
        };

        const copy = [...playlists];
        copy[playlists.findIndex(playlist => playlist === thisPlaylist)] = randomizedThisPlaylist;
        setPlaylists(copy);
    }

    function handleOnDragEnd(result){
        if(!result.destination || result.destination === result.source) return;

        const thisPlaylist = playlists[playlists.findIndex(playlist => playlist?.id === id)];
        const songsCopy = [...songs];
        const [songDraggedOut] = songsCopy.splice(result.source.index, 1);
        songsCopy.splice(result.destination.index, 0, songDraggedOut);

        const draggedPlaylist = {
            "id": thisPlaylist.id,
            "title": thisPlaylist.title,
            "songs" : songsCopy
        };

        const sCopy = [...playlists];
        sCopy[playlists.findIndex(playlist => playlist === thisPlaylist)] = draggedPlaylist;
        setPlaylists(sCopy);
    }

    const getDragStyle = (isDraggingOver) => ({
        background: isDraggingOver ? "#789aa1" : "#95b8bf",
        padding: "10px"
    });

    const getSongCardStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        padding: "10px",
        marginBottom: "5px",
        marginTop: "5px",
        background: isDragging ? "#7bd7bc" : "#58777f",
        borderRadius: "10px",
        ...draggableStyle
    })
    
    return (
        <div>
            <SongModal className={"song-modal"} show={show} onClose={onClose} songs={songs} playlists={playlists} setPlaylists={setPlaylists} currentInd={playlists.findIndex(playlist => playlist?.id === id)}/>
            {!show && (<div className='card'>
                <h2 className='playlist-title-h2'>{playlists[playlists.findIndex(playlist => playlist?.id === id)]?.title}</h2>
                <div className='autoplay-and-search'>
                    <button className='autoplay-button' onClick={() => {startAutoPlay(0)}}>{"Autoplay ".concat(String.fromCharCode(9654))}</button>
                    <button className='random-button' onClick={() => {randomizeSongs()}}>Randomize</button>
                    <div>
                        <button className='search-song-button'>Search</button>
                        <input defaultValue="Search for a song..."/>
                    </div>
                </div>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='inner-card'>
                    {(provided, snapshot) =>( 
                            <div className='inner-card' {...provided.droppableProps} ref={provided.innerRef} style={getDragStyle(snapshot.isDraggingOver)}>
                                {
                                    songs.map((song, index) => (
                                            <Draggable  key={song?.id} draggableId={song?.id} index={index}>
                                                {(provided, snapshot) => (
                                                <div className='song-video' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getSongCardStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                                    <h4 className='song-title-h4'>{(song?.title.length < 20) ? song?.title : song?.title.slice(0,17).concat("...")}</h4>
                                                    <YouTube 
                                                        ref={(el) => {songsRef.current[index] = el}}
                                                        videoId={getIdFromUrl(song?.source)}
                                                        opts={videoParams}
                                                        onEnd={(event) => _onEnd(event)}
                                                        onStateChange = {(event) => _onStateChange(event)}
                                                        onPause={(event) => _onPause(event)}
                                                        onPlay={(event) => _onPlay(event)}
                                                        onLoad={(event) => _onLoad(event)}
                                                        id={`iframe-${song?.id}`}
                                                    />
                                                    <button className='delete-button' onClick={() => {deleteSong(song?.id)}}>Delete Song</button>
                                                </div>)}
                                            </Draggable>
                                        )
                                    )
                                }
                                {provided.placeholder}
                            </div>
                    )}
                    </Droppable>
                </DragDropContext>
                <button className='add-song-button' onClick={() => showModal()}>Add Song</button>
                <button className='delete-playlist-button' onClick={() => {handleDeletePlaylist(id)}}>Delete Playlist</button>
            </div>)}
        </div>
    )
}
