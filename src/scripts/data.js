export const members = ['Artur', 'Oleg', 'Victoria', 'Irina', 'Olga', 'Yuriy'];
export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
export const time = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];


// Get events from storage
export const events = [];
const keys = Object.keys(localStorage);
for (let key of keys) {
    events.push(JSON.parse(localStorage.getItem(key)));
};