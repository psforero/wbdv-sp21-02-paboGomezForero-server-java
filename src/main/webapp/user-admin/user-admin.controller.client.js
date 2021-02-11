var $tbody;
var $createBtn;
var $updateBtn;
var $removeBtn;
var $editBtn;
var usersDB;

function renderUsers(users) {
    $tbody.empty();
    for (var i = 0; i < users.length; i++) {
        $tbody
            .prepend(`
            <tr class="wbdv-template wbdv-user wbdv-hidden">
            <td class="wbdv-username">${users[i].username}</td>
            <td>&nbsp;</td>
            <td class="wbdv-first-name">${users[i].firstName}</td>
            <td class="wbdv-last-name">${users[i].lastName}</td>
            <td class="wbdv-role">${users[i].role}</td>
            <td class="wbdv-actions">
                <span>
                    <i class="fa-2x fa fa-times wbdv-remove" id="${i}"></i>
                    <i class="fa-2x fa fa-pencil wbdv-edit"></i>
                </span>
            </td>
        </tr>`
            );
    }

    jQuery(".wbdv-remove")
        .click(deleteUser);

    jQuery(".wbdv-edit")
        .click(editUser);
}

$(main);


/**Executes on document load, when the browser is done parsing the html page and the dom is ready.
 * Retrieved the dom elements needed later in the controller such as the form elements, action icons, and templates.
 * Binds action icons, such as create, update, select, and delete, to respective event handlers
 */
function main() {
    usersDB = [
        {username: "pforero", firstName: "Pablo", lastName: "Forero", role: "FACULTY"},
        {username: "breaLimon3", firstName: "Brea", lastName: "Limon", role: "STUDENT"},
        {username: "Uri666", firstName: "Uranai", lastName: "Baba", role: "STUDENT"}
    ];

    $createBtn = jQuery(".wbdv-create");
    $createBtn.click(createUser);
    $updateBtn = jQuery(".wbdv-update");
    $updateBtn.click(updateUser);

    $tbody = jQuery(".wbdv-tbody");

    renderUsers(usersDB);
}


/**Handles create user event when user clicks on plus icon. Reads from the form elements and creates a user object.
 * Uses the user service createUser() function to create the new user. Updates the list of users on server response.
 */
function createUser() {
    // create new user
    var $usernameFld = jQuery("#usernameFld");
    var $passwordFld = jQuery("#passwordFld");
    var $firstNameFld = jQuery("#firstNameFld");
    var $lastNameFld = jQuery("#lastNameFld");
    var $roleFld = jQuery("#roleFld");

    var newUser = {
        username: $usernameFld.val(),
        firstName: $firstNameFld.val(),
        lastName: $lastNameFld.val(),
        role: $roleFld.val()
    }

    // clear fields
    $usernameFld.val("");
    $passwordFld.val("");
    $firstNameFld.val("");
    $lastNameFld.val("");
    $roleFld.val("");

    // add user and render
    usersDB.push(newUser);
    renderUsers(usersDB);
}

/**Handles delete user event when user clicks the cross icon. Reads the user id from the icon id attribute.
 * Uses user service deleteUser() to send a delete request to the server. Updates user list on server response.
 * @param event - the event passed by the delete button
 */
function deleteUser(event) {
    $removeBtn = jQuery(event.target);
    var index = $removeBtn.attr("id");
    usersDB.splice(index, 1);
    renderUsers(usersDB);
}


function editUser(event) {
    alert("Edit user button pressed")
}

/**handles update user event when user clicks on check mark icon. Reads the user id from the icon id attribute.
 * Reads new user values form the form, creates a user object and then uses user service updateUser() to send the new
 * user data to server. Updates user list on server response.
 */
function updateUser() {
    alert("update button clicked");
}