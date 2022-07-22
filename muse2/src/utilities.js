export function convertNormalUrlToEmbed(url){
    const code = url.slice(url?.indexOf("v=") + "v=".length, url?.indexOf("v=") + "v=".length + 11);
    return(`https://www.youtube.com/embed/${code}`);
}

export function getIdFromUrl(url){
    //console.log(url);
    //console.log(url.slice(url?.indexOf("v=") + "v=".length, url?.indexOf("v=") + "v=".length + 11));
    return(url.slice(url?.indexOf("v=") + "v=".length, url?.indexOf("v=") + "v=".length + 11));
}