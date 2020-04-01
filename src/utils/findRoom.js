export function findRoom(hash, rooms) {
    return !!rooms.find(r => r.hash === hash);
}