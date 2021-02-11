// buttons and table
var $tbody;
var $createBtn;
var $updateBtn;
var $removeBtn;
var $selectBtn;

var selectedUser; // for select function

// input fields
var $usernameFld;
var $passwordFld;
var $firstNameFld;
var $lastNameFld;
var $roleFld;

// local array and server
var usersDB;
var userService = new AdminUserServiceClient();


$(main);


/**
 * Executes on document load, when the browser is done parsing the html page and the dom is ready.
 * Retrieved the dom elements needed later in the controller such as the form elements, action icons, and templates.
 * Binds action icons, such as create, update, select, and delete, to respective event handlers
 */
function main() {
    // bind buttons and click events
    $createBtn = jQuery(".wbdv-create");
    $createBtn.click(createUser);
    $updateBtn = jQuery(".wbdv-update");
    $updateBtn.click(updateUser);

    selectedUser = null;

    // bind input fields
    $usernameFld = jQuery("#usernameFld");
    $passwordFld = jQuery("#passwordFld");
    $firstNameFld = jQuery("#firstNameFld");
    $lastNameFld = jQuery("#lastNameFld");
    $roleFld = jQuery("#roleFld");

    // bind table and initialize local array
    $tbody = jQuery(".wbdv-tbody");
    usersDB = [];
    findAllUsers();
}


/**
 * Handles create user event when user clicks on plus icon. Reads from the form elements and creates a user object.
 * Uses the user service createUser() function to create the new user. Updates the list of users on server response.
 */
function createUser() {
    // create new user
    var newUser = {
        username: $usernameFld.val(),
        password: $passwordFld.val(),
        firstName: $firstNameFld.val(),
        lastName: $lastNameFld.val(),
        role: $roleFld.val()
    }

    // update server and local, then render
    userService.createUser(newUser)
        .then(function (userFromServer) {
            usersDB.push(userFromServer);
            renderUsers(usersDB);
            clearInputFields();
        });
}

/**
 * Handles delete user event when user clicks the cross icon. Reads the user id from the icon id attribute.
 * Uses user service deleteUser() to send a delete request to the server. Updates user list on server response.
 * @param event - the event passed by the delete button
 */
function deleteUser(event) {
    $removeBtn = jQuery(event.target);
    var userIndex = $removeBtn.attr("id");
    var userId = usersDB[userIndex]._id;

    // update server and local, then render
    userService.deleteUser(userId)
        .then(function (status) {
            usersDB.splice(userIndex, 1);
            renderUsers(usersDB);
            clearInputFields();
        });
}

/**
 * To edit a user, admins click on the edit user icon -- the pencil icon -- and the user info appears in the top form.
 * To update the selected user, the admin can edit the form and then click on the update user icon -- the checkbox icon.
 * @param event
 */
function selectUser(event) {

    var prevUserId;
    if (selectedUser != null) {
        prevUserId = selectedUser._id;
    }

    $selectBtn = jQuery(event.target);
    var userIndex = $selectBtn.attr("id");
    selectedUser = usersDB[userIndex];

    var rowColor;
    if (prevUserId === selectedUser._id) {
        selectedUser = null;
        clearInputFields();
        rowColor = "#f8f9fa";
    } else {
        // update input fields with selected user values
        $usernameFld.val(selectedUser.username);
        $passwordFld.val(selectedUser.password);
        $firstNameFld.val(selectedUser.firstName);
        $lastNameFld.val(selectedUser.lastName);
        $roleFld.val(selectedUser.role);
        rowColor = "lightblue";
    }

    // Change row background to show selection
    jQuery(`tr#row-${userIndex}`).css("background-color", rowColor);
}

/**
 * handles update user event when user clicks on check mark icon. Reads the user id from the icon id attribute.
 * Reads new user values form the form, creates a user object and then uses user service updateUser() to send the new
 * user data to server. Updates user list on server response.
 */
function updateUser() {
    if (selectedUser != null) {
        selectedUser.username = $usernameFld.val();
        selectedUser.password = $passwordFld.val();
        selectedUser.firstName = $firstNameFld.val();
        selectedUser.lastName = $lastNameFld.val();
        selectedUser.role = $roleFld.val();
        userService.updateUser(selectedUser._id, selectedUser)
            .then(function (status) {
                var index = usersDB.findIndex(user => user._id === selectedUser._id);
                usersDB[index] = selectedUser;
                renderUsers(usersDB);
                clearInputFields();
                selectedUser = null;
            })
    }
}

/**
 * accepts an array of user instances, clears the current content of the table body, iterates over the array of users,
 * clones a table row template for each user instance, populates the table row with the user object properties, adds
 * the table row to the table body
 * @param users - the array to display
 */
function renderUsers(users) {
    $tbody.empty();
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        $tbody
            .prepend(`
            <tr class="wbdv-template wbdv-user wbdv-hidden" id="row-${i}">
            <td class="wbdv-username">${user.username}</td>
            <td>&nbsp;</td>
            <td class="wbdv-first-name">${user.firstName}</td>
            <td class="wbdv-last-name">${user.lastName}</td>
            <td class="wbdv-role">${user.role}</td>
            <td class="wbdv-actions">
                <span>
                    <i class="fa-2x fa fa-times wbdv-remove" id="${i}"></i>
                    <i class="fa-2x fa fa-pencil wbdv-select" id="${i}"></i>
                </span>
            </td>
        </tr>`
            );
    }

    jQuery(".wbdv-remove")
        .click(deleteUser);

    jQuery(".wbdv-select")
        .click(selectUser);
}

/**
 * called whenever the list of users needs to be refreshed. Uses user service findAllUsers() to retrieve all the users
 * and passes response to renderUsers
 */
function findAllUsers() {
    userService.findAllUsers()
        .then(function (usersFromServer) {
            usersDB = usersFromServer;
            renderUsers(usersDB);
        });
}

/**
 * called whenever a particular user needs to be retrieved by their id, as in when a user is selected for editing.
 * Reads the user id from the icon id attribute. Uses user service findUserById() to retrieve user and then updates
 * the form on server response
 */
function findUserById() {

}

/**
 * Clear input fields
 */
function clearInputFields() {
    $usernameFld.val("");
    $passwordFld.val("");
    $firstNameFld.val("");
    $lastNameFld.val("");
    $roleFld.val("");
}