window.onload = function() {

    let userData = getOriginalUserData()() as User;

    let appRoot = document.getElementById('app-root') as HTMLElement;
    let profileContainer = render('div', [{k: 'id', v: 'profile-info-container'}, {k: 'class', v: 'container'}], appRoot);
    let usernameField = render('input', [{k: 'id', v: 'profile-username-field'}, {k: 'placeholder', v: userData['username']}, {k: 'disabled', v: 'true'}], profileContainer) as HTMLInputElement;
    let passwordField = render('input', [{k: 'id', v: 'profile-password-field'}, {k: 'placeholder', v: userData['password']}, {k: 'disabled', v: 'true'}], profileContainer) as HTMLInputElement;
    let editCheckbox = render('input', [{k: 'id', v: 'profile-edit-toggle'}, {k: 'type', v: 'checkbox'}], profileContainer, false);
    
    let submitEditButton = render('button', [{k: 'id', v: 'submit-edit-button'}, {k: 'class', v: 'btn btn-primary'}], profileContainer, false);
    submitEditButton.textContent = 'Submit Edits';

    let clearChangesButton = render('button', [{k: 'id', v: 'clear-changes-button'}, {k: 'class', v: 'btn btn-primary'}], profileContainer);
    clearChangesButton.textContent = 'Clear Changes';

    editCheckbox.addEventListener('change', () => {
        if (usernameField.hasAttribute('disabled') || passwordField.hasAttribute('disabled')) {
            usernameField.removeAttribute('disabled');
            passwordField.removeAttribute('disabled');
        } else {
            usernameField.setAttribute('disabled', 'true');
            passwordField.setAttribute('disabled', 'true');
        }
    });

    submitEditButton.addEventListener('click', () => {
        let un = usernameField.value;
        let pw = passwordField.value;
        if (un && pw) {
            console.log(un, pw);
        }
    });
    
    clearChangesButton.addEventListener('click', () => {
        usernameField.value = '';
        passwordField.value = '';
    });
}

function render(tag: string, attributes: {k: string, v: string}[], parent: HTMLElement, addBreak: boolean = true, ...props: any): HTMLElement {
    let element = document.createElement(tag);
    attributes.forEach(attr => element.setAttribute(attr.k, attr.v));
    parent.append(element);
    if (addBreak) {
        parent.append(document.createElement('br'));
    }

    if (props && props.length != 0) {
        element.textContent = props
    }

    return element;
}

function getOriginalUserData() {
    console.log('getOriginalUserData called!');

    let originalUser: User;

    return function() {
        console.log('closured function called!');
        if (!originalUser) {
            originalUser = fakeFetch();
        }
        return originalUser;
    }
}

function fakeFetch(): User {
    console.log('fakeFetch called!');
    return new User('wsingleton', 'password');
}

class User {
    constructor(private username: string, private password: string) {}
}