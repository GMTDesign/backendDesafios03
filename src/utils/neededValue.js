export function neededValue(value, flag){
    if (value === null || value === undefined) throw new Error(`${flag} no puede ser null`)
    return value
}