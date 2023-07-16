import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-state';

const feedbackFormEl = document.querySelector('.feedback-form');

let formData = {};

feedbackFormEl.addEventListener('input', throttle(onFormInput, 500));
feedbackFormEl.addEventListener('submit', onFormSubmit);

onFeedbackFormElCheck();

function onFormInput(evt) {
    formData[evt.target.name] = evt.target.value;
    const formDataJSON = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, formDataJSON);
}

function onFormSubmit(evt) {
    evt.preventDefault();
    const { email, message } = evt.currentTarget.elements;
    if (email.value === '' || message.value === '') {
        return alert('Please fill in all the fields!');
    }
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(formData);
} 

function onFeedbackFormElCheck() {
    const dataSavedJSON = localStorage.getItem(STORAGE_KEY);
    if (dataSavedJSON) {
        formData = JSON.parse(dataSavedJSON);
        for (let key in formData) {
            feedbackFormEl[key].value = formData[key];
        }
    }
}