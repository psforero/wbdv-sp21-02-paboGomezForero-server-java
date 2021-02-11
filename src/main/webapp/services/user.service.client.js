function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/pforero731151/users';
    var self = this;

    /**
     * Adds a new user object to the collection of users.
     * @param user - the object to add
     */
    function createUser(user) {
        return fetch(self.url,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then(function (response) {
            return response.json();
        });
    }

    /**
     * Retrieves all users as an array of JSON objects.
     */
    function findAllUsers() {
        return fetch(self.url)
            .then(function (response) {
                return response.json();
            });
    }

    /**
     * Retrieves a single user object whose id is equal to the id parameter.
     * @param userId - the id to search for in the collection
     */
    function findUserById(userId) {

    }

    /**
     * Accepts a user id and user object with new property values for the user with userId. Finds the use whose id
     * matches the id parameter and updates it with the values in the user parameter.
     * @param userId - the id to search for in the collection
     * @param user - the object with the updated values
     */
    function updateUser(userId, user) {
        return fetch(`${self.url}/${userId}`,
            {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then(function (response) {
            return response.json();
        });
    }

    /**
     * Removes the user whose id matches the id parameter.
     * @param userId
     */
    function deleteUser(userId) {
        return fetch(`${self.url}/${userId}`,
            {method: 'DELETE'});
    }
}