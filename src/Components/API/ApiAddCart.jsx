import { serverAddress } from "../Global/Config"

export const getCarts = async (userId) => {
    const response = await fetch(`${serverAddress}/getCarts/${userId}`,{
        method:'GET',
        headers:{ "Content-Type": "application/json"}
    })
    if (response.ok) {
        return await response.json();
    }
}