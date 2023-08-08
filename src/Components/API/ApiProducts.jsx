import { serverAddress } from "../Global/Config"

export const gettingProducts = async (data, page) => {
    const response = await fetch(`${serverAddress}/Products`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...data,
            page: page,
        })
    })
    if (response.ok) {
        return await response.json();
    }
}
export const getSuggestion = async (Keywords) => {
    const response = await fetch(`${serverAddress}/Suggestion`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Search: Keywords
        })
    });
    const json = await response.json();
    return json;
}

 
 