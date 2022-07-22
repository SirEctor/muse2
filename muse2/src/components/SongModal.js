import React, { useState } from 'react'
import {v4 as uuid} from "uuid";

export default function SongModal({ show, onClose, songs, playlists, setPlaylists, currentInd }) {
    const [songState, setSongState] = useState({
        "title":"",
        "URL":""
    });

    function handleChange(event){
        setSongState({
            ...songState,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event){
        event.preventDefault();
        const copyOfPlaylists = [...playlists];
        copyOfPlaylists[currentInd].songs = [...songs, {
            id: uuid(),
            title: songState.title,
            source: songState.URL
        }];

        setPlaylists(copyOfPlaylists);
       
        setSongState({
            "title":"",
            "URL":""
        });

        onClose();
    }
    
    
    if(show){
        return(
            <div className='modal'>
                <h3>Enter A Song:</h3>
                <div>
                    <form onSubmit={(event) => {handleSubmit(event)}}>
                    <label className="title-label">
                        {"Title: "}
                        <input name="title" type={"text"} value={songState.title} onChange={handleChange} />
                    </label>
                    <br />
                    <label className='url-label'>
                        {"URL: "}
                        <input name="URL" type={"text"} value={songState.URL} onChange={handleChange} />
                    </label>
                    </form>
                    <input type="submit" id="song-submit-button" value="Submit" onClick={(event) => handleSubmit(event)}/>
                    <button id="song-close-button" onClick={() => onClose()}>Cancel</button>
                </div>
            </div>  
        )
    }else{
        return(null)
    }

}
