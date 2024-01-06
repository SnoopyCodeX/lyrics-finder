export const findLyrics = async (song: string) => {
    const response = await fetch(`https://lyrics-finder-api.vercel.app/lyrics?song=${encodeURIComponent(song)}`)
    const json = await response.json()

    return json
}