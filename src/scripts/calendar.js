import '../styles/calendar.css';
import {members, days, time, events} from './data.js';


// Add options to select
const selectMembers = document.querySelector('.selectMembers');
for (let i = 0; i < members.length; i++) {
    let opt = members[i];
    let el = document.createElement('option');
    el.textContent = opt;
    el.value = opt;
    selectMembers.append(el);
};


// Create body of calendar table
function createTableBody() {
    const tbody = document.createElement('tbody');
    document.querySelector('.table').append(tbody);
    for (let i = 0; i < time.length; i++) {
        let row = document.createElement('tr');
        row.innerHTML = `<th>${time[i]}</th>`;
        tbody.append(row);
        for (let j = 0; j < days.length; j++) {
            let tableData = document.createElement('td');
            tableData.setAttribute('id', `${days[j]}-${time[i]}`);
            row.append(tableData);
        };
    };
};

createTableBody();


// Link to another page
const addNewEvent = document.querySelector('#buttonAddNewEvent');
addNewEvent.addEventListener('click', () => {
    window.location.href = './create_event.html';
});


// Add events to table
for (let event of events) {
    let td = document.getElementById(`${event.day}-${event.time}`);
    td.innerHTML = `<span>${event.name}</span><span class="symbolDelEvent">&times;</span>`;
};


// Events filter
function eventsFilter() {
    const filterEvents = document.querySelector('#filterEventsByMember');
    filterEvents.addEventListener('change', (event) => {
        const selectedName = event.target.value;
        for (let event of events) {
            let td = document.getElementById(`${event.day}-${event.time}`);
            if ((event.members).includes(selectedName)) {
                td.childNodes.forEach(e => e.classList.remove('hide'));
            } else if (selectedName === 'All members') {
                td.childNodes.forEach(e => e.classList.remove('hide'));
            } else {
                td.childNodes.forEach(e => e.classList.add('hide'));
            };
        };
    });
};

eventsFilter();


// Delete event from localStorage
function deleteEvent() {
    const modal = document.getElementById('modalWindow');
    const buttonsDeleteEvent = document.querySelectorAll('.symbolDelEvent');
    for (let i = 0; i < buttonsDeleteEvent.length; i++) {
        buttonsDeleteEvent[i].addEventListener("click", (e) => {
            modal.style.display = "block";
            let currentEvent = (e.target).previousSibling.textContent;
            let buttonAcceptDel = document.getElementById('modalButtonAccept');
            let modalHeader = document.getElementById('modalHeader');
            modalHeader.textContent = `Are you sure you want to delete "${currentEvent}" event?`;
            buttonAcceptDel.addEventListener('click', () => {
                localStorage.removeItem(`${currentEvent}`);
                buttonsDeleteEvent[i].parentElement.innerHTML = '';
                modal.style.display = "none";
            });
            let buttonCancelDel = document.getElementById('modalButtonCancel');
            buttonCancelDel.addEventListener('click', () => {
                modal.style.display = "none";
            });
        });
    };
};

deleteEvent();