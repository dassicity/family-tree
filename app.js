let root_level = 0; // The user's level
let lowest_level;   // Lowest level or the level of the oldest member in the family
let highest_level;  // Highest level or the level of the youngest memeber
let root_user;  // Used to store the current user

let Users = []; // Mock database to store the list of users

// The User class
class User {
    constructor(name, level, gender) {
        this.name = name;
        this.level = level;
        this.gender = gender;
        this.partner = null;
        this.children = [];
        this.parents = [];
    }

}

// Function to update the state of a user - mainly the field that were changed during modification
function update_user(user) {
    let user_to_update = Users.find(u => u.name === user.name);

    user_to_update.partner = user.partner;
    user_to_update.children = user.children;
    user_to_update.parents = user.parents;
}

// Function to create a person or if it exists , to find it's object instance
function find_or_create_person(name, gender, level) {
    let user = Users.find(u => u.name === name);    // Checking if the name exists 
    if (!user) {
        user = new User(name, level, gender);
        Users.push(user);
    }

    root_user = user;   // Updating the root user
    level = root_user.level;    // Updating the root level
    return user;
}

// Query selector and event listener for when a new user registers
document.querySelector('#new_user').addEventListener('submit', function (e) {
    e.preventDefault();
    let name = document.querySelector('#user_name').value.trim();
    let gender = document.querySelector('#gender').value;
    let level = root_level;

    let user = new User(name, level, gender);   // Creating the User type instance
    Users.push(user);   // Pushing into the mock database
});

// Query selector and event listener for when an existing user registers
document.querySelector('#existing_user').addEventListener('submit', function (e) {
    e.preventDefault();
    let name = document.querySelector('#user_name').value.trim();
    let gender = document.querySelector('#gender').value;
    let level = root_level;

    root_user = find_or_create_person(name, gender, level);
});

// For when a user wants to add any of their relative
document.querySelector('#relative_input').addEventListener('submit', function (e) {
    e.preventDefault();

    let name = document.querySelector('#user_name').value.trim();
    let gender = document.querySelector('#gender').value;
    let relationship = document.querySelector('#relationship').value;

    let user;

    // Switch case for various relationship types
    switch (relationship) {
        case 'father':
        case 'mother':
            user = find_or_create_person(name, gender, root_level - 1);
            add_parent(user);
            lowest_level = root_level - 1;
            break;

        case 'child':
            user = find_or_create_person(name, gender, root_level + 1);
            add_child(user);
            highest_level = root_level + 1;
            break;
        case 'maternal_uncle':
        case 'maternal_aunt':
            user = find_or_create_person(name, gender, root_level - 1);
            add_maternal_uncle(user);
            lowest_level = root_level - 1;
            break;
        case 'paternal_uncle':
        case 'paternal_aunt':
            user = find_or_create_person(name, gender, root_level - 1);
            add_paternal_uncle(user);
            lowest_level = root_level - 1;
            break;
        case 'sibling':
            user = find_or_create_person(name, gender, root_level);
            add_sibling(user);
            break;

        case 'partner':
            user = find_or_create_person(name, gender, root_level);
            add_partner(user);
            break;
    }
});

// Updating the parents field in the root user and the children field in the parent user
function add_parent(parent) {
    root_user.parents = [...root_user.parents, parent];
    parent.children = [...parent.children, root_user];

    update_user(root_user);
    update_user(parent);
}

// Updating the children field in the root user and the parent field in the child user
function add_child(child) {
    root_user.children = [...root_user.children, child];
    child.parents = [...child.parents, root_user];

    update_user(root_user);
    update_user(child);
}

// In this method, we find the mother and then her parents. And then add the uncle/aunt as a children to that parent as there are no siblings field in the User class
// Sibling field was not included as there are no lines visualized with brothers or sisters in a family tree. All links are made to parents.
function add_maternal_uncle(uncle) {
    let mother = root_user.parents[0].gender === 'male' ? root_user.parents[0] : root_user.parents[1];

    let grand_parent1 = mother.parents[0];
    let grand_parent2 = mother.parents[1];

    grand_parent1.children = [...grand_parent1.children, uncle];
    grand_parent2.children = [...grand_parent2.children, uncle];

    uncle.parents = [grand_parent1, grand_parent2];
}

// In this method, we find the father and then his parents. And then add the uncle/aunt as a children to that parent as there are no siblings field in the User class
function add_paternal_uncle(uncle) {
    let father = root_user.parents[0].gender === 'female' ? root_user.parents[0] : root_user.parents[1];

    let grand_parent1 = father.parents[0];
    let grand_parent2 = father.parents[1];

    grand_parent1.children = [...grand_parent1.children, uncle];
    grand_parent2.children = [...grand_parent2.children, uncle];

    uncle.parents = [grand_parent1, grand_parent2];
}

// In this method we find the parent and add the sibling as a children to that parent
function add_sibling(sibling) {
    let parent = root_user.parents;
    let parent1 = parent[0];
    let parent2 = parent[1];

    parent1.children = [...parent1.children, sibling];
    parent2.children = [...parent2.children, sibling];

    sibling.parents = [parent1, parent2];

    update_user(parent1);
    update_user(parent2);
    update_user(sibling);
}

// we just modify the partner attribute in this method
function add_partner(partner) {

    root_user.partner = partner;
    partner.partner = root_user;

    update_user(root_user);
    update_user(partner);
}