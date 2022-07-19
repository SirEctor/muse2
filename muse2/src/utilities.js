export function convertNormalUrlToEmbed(url){
    const code = url.slice(url?.indexOf("v=") + "v=".length, url?.indexOf("v=") + "v=".length + 11);
    return(`https://www.youtube.com/embed/${code}`);
}
