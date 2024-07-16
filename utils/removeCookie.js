export function removeCookie(name) {
    document.cookie = `${name}=; Max-Age=-99999999;`;
}