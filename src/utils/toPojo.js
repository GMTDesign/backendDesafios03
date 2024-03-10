export function toPOJO(object) {
    return JSON.parse(JSON.stringify(object))
}