export const isBlank = (str: string| null): boolean => {
    return (!str || /^\s*$/.test(str));
}