import '../styles/create_event.css';
import {members, days, time, events} from './data.js';


// Create form
function createForm() {
    const selectMembers = document.querySelector('.selectMembers');
    for (let i = 0; i < members.length; i++) {
        let opt = members[i];
        let el = document.createElement('option');
        el.textContent = opt;
        el.value = opt;
        selectMembers.append(el);
    };
    const selectDay = document.querySelector('.selectDay');
    for (let i = 0; i < days.length; i++) {
        let opt = days[i];
        let el = document.createElement('option');
        el.textContent = opt;
        el.value = opt;
        selectDay.append(el);
    };
    const selectTime = document.querySelector('.selectTime');
    for (let i = 0; i < time.length; i++) {
        let opt = time[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        selectTime.append(el);
    };
};

createForm();


// Create event
function createEvent() {
    const eventName = document.querySelector('.inputName').value;
    const selectedMembers = document.querySelectorAll('.selectMembers option:checked');
    const eventMembers = Array.from(selectedMembers).map(el => el.value);
    const selectEventDay = document.querySelector('.selectDay');
    const eventDay = selectEventDay.options[selectEventDay.selectedIndex].value;
    const selectEventTime = document.querySelector('.selectTime');
    const eventTime = selectEventTime.options[selectEventTime.selectedIndex].value;
    const newEvent = {};
    newEvent.name = eventName;
    newEvent.members = eventMembers;
    newEvent.day = eventDay;
    newEvent.time = eventTime;
    return newEvent;
};


// Link to another page
const btnCancel = document.getElementById('buttonCancelEvent');
btnCancel.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './calendar.html';
});


// Form validation
function formValidation() {
    const form = document.querySelector('form');
    const fields = form.querySelectorAll('.formField');
    const formDay = document.querySelector('.selectDay');
    const formTime = document.querySelector('.selectTime');
    const errorBlock = document.querySelector('.errorBlock');
    const btnCreate = document.getElementById('buttonCreateEvent');
    btnCreate.addEventListener('click', (e) => {
        e.preventDefault();
        const errors = form.querySelectorAll('.error');
        for (let i = 0; i < errors.length; i++) {
            errors[i].remove();
        };
        for (let i = 0; i < fields.length; i++) {
            if (!fields[i].value) {
                let error = document.createElement('div');
                error.className = 'error';
                error.style.color = 'red';
                error.innerHTML = 'Required field';
                form[i].parentElement.insertBefore(error, fields[i]);
                return false
            };
        };
        for (let event of events) {
            if (formDay.value === event.day && formTime.value === event.time) {
                errorBlock.innerHTML = '<div>Time slot is already booked</div>';
                errorBlock.style.display = 'block';
                return false;
            };
        };
        localStorage.setItem(`${createEvent().name}`, JSON.stringify(createEvent()));
        window.location.href = './calendar.html';
    });
};

formValidation();