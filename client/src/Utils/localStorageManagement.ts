export const KEY_ACCESS_TOKEN = "levitation-access-token"

export function getItem(key:string) {
    return localStorage.getItem(key)
}

export function setItem(key:string, value:string) {
    localStorage.setItem(key, value)
}

export function removeItem(key:string) {
    localStorage.removeItem(key)
}