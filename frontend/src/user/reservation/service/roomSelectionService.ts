import {Room} from "../../../interface/interface";


export const toggleRoomSelection = (selectedRooms: Room[], room: Room): Room[] => {
    const isSelected = selectedRooms.some(r => r.id === room.id);

    if (isSelected) {
        return selectedRooms.filter(r => r.id !== room.id);
    } else {
        return [...selectedRooms, room];
    }
};
