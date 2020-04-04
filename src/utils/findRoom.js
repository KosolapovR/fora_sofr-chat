//проверяем наличии комнаты в массиве комнат пользователя
export function findRoom(hash, rooms) {
    return !!rooms.find(r => r.hash === hash);
}