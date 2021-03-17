"use strict";
window.onload = function () {
    var userData = getOriginalUserData()();
    var appRoot = document.getElementById('app-root');
    var profileContainer = render('div', [{ k: 'id', v: 'profile-info-container' }, { k: 'class', v: 'container' }], appRoot);
    var usernameField = render('input', [{ k: 'id', v: 'profile-username-field' }, { k: 'placeholder', v: userData['username'] }, { k: 'disabled', v: 'true' }], profileContainer);
    var passwordField = render('input', [{ k: 'id', v: 'profile-password-field' }, { k: 'placeholder', v: userData['password'] }, { k: 'disabled', v: 'true' }], profileContainer);
    var editCheckbox = render('input', [{ k: 'id', v: 'profile-edit-toggle' }, { k: 'type', v: 'checkbox' }], profileContainer, false);
    var submitEditButton = render('button', [{ k: 'id', v: 'submit-edit-button' }, { k: 'class', v: 'btn btn-primary' }], profileContainer, false);
    submitEditButton.textContent = 'Submit Edits';
    var clearChangesButton = render('button', [{ k: 'id', v: 'clear-changes-button' }, { k: 'class', v: 'btn btn-primary' }], profileContainer);
    clearChangesButton.textContent = 'Clear Changes';
    editCheckbox.addEventListener('change', function () {
        if (usernameField.hasAttribute('disabled') || passwordField.hasAttribute('disabled')) {
            usernameField.removeAttribute('disabled');
            passwordField.removeAttribute('disabled');
        }
        else {
            usernameField.setAttribute('disabled', 'true');
            passwordField.setAttribute('disabled', 'true');
        }
    });
    submitEditButton.addEventListener('click', function () {
        var un = usernameField.value;
        var pw = passwordField.value;
        if (un && pw) {
            console.log(un, pw);
        }
    });
    clearChangesButton.addEventListener('click', function () {
        usernameField.value = '';
        passwordField.value = '';
    });
};
function render(tag, attributes, parent, addBreak) {
    if (addBreak === void 0) { addBreak = true; }
    var props = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        props[_i - 4] = arguments[_i];
    }
    var element = document.createElement(tag);
    attributes.forEach(function (attr) { return element.setAttribute(attr.k, attr.v); });
    parent.append(element);
    if (addBreak) {
        parent.append(document.createElement('br'));
    }
    if (props && props.length != 0) {
        element.textContent = props;
    }
    return element;
}
function getOriginalUserData() {
    console.log('getOriginalUserData called!');
    var originalUser;
    return function () {
        console.log('closured function called!');
        if (!originalUser) {
            originalUser = fakeFetch();
        }
        return originalUser;
    };
}
function fakeFetch() {
    console.log('fakeFetch called!');
    return new User('wsingleton', 'password');
}
var User = /** @class */ (function () {
    function User(username, password) {
        this.username = username;
        this.password = password;
    }
    return User;
}());
