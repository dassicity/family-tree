let level = 0;
let lowest_level;
let highest_level;
let root_user;

let Users = [];

class User {
    constructor(name, level, gender) {
        this.name = name;
        this.level = level;
        this.gender = gender;
        this.partner = null;
        this.children = [];
        this.parents = [];
    }

    add_partner(partner) {
        this.partner = partner;
    }

    add_children(children) {
        this.children = [...this.children, ...children];
    }

    add_parents(parents) {
        this.parents = [...this.parents, ...parents];
    }
}

function update_user(user) {
    let user_to_update = Users.find(u => u.name === user.name);

    user_to_update.partner = user.partner;
    user_to_update.children = user.children;
    user_to_update.parents = user.parents;
}

function find_or_create_person(name, gender, level) {
    let user = Users.find(u => u.name === name);
    if (!user) {
        user = new User(name, level, gender);
        Users.push(user);
    }

    root_user = user;
    level = root_user.level;
    return user;
}

document.querySelector('#new_user').addEventListener('submit', function (e) {
    e.preventDefault();
    let name = document.querySelector('#user_name').value.trim();
    let gender = document.querySelector('#gender').value;
    let level = level;

    let user = new User(name, level, gender);
    Users.push(user);
});

document.querySelector('#relative_input').addEventListener('submit', function (e) {
    e.preventDefault();

    let name = document.querySelector('#user_name').value.trim();
    let gender = document.querySelector('#gender').value;
    let relationship = document.querySelector('#relationship').value;

    let user;

    switch (relationship) {
        case 'father':
        case 'mother':
            user = find_or_create_person(name, gender, level - 1);
            add_parent(user);
            lowest_level = level - 1;
            break;

        case 'child':
            user = find_or_create_person(name, gender, level + 1);
            add_child(user);
            highest_level = level + 1;
            break;
        case 'maternal_uncle':
        case 'maternal_aunt':
            user = find_or_create_person(name, gender, level - 1);
            add_maternal_uncle(user);
            lowest_level = level - 1;
            break;
        case 'paternal_uncle':
        case 'paternal_aunt':
            user = find_or_create_person(name, gender, level - 1);
            add_paternal_uncle(user);
            lowest_level = level - 1;
            break;
        case 'sibling':
            user = find_or_create_person(name, gender, level);
            add_sibling(user);
            break;

        case 'partner':
            user = find_or_create_person(name, gender, level);
            add_partner(user);
            break;
    }
});

function add_parent(parent) {
    root_user.parents = [...root_user.parents, parent];
    parent.children = [...parent.children, root_user];

    update_user(root_user);
    update_user(parent);
}

function add_child(child) {
    root_user.children = [...root_user.children, child];
    child.parents = [...child.parents, root_user];

    update_user(root_user);
    update_user(child);
}

function add_maternal_uncle(user) {

}

function add_paternal_uncle(user) {

}

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

function add_partner(partner) {

    root_user.partner = partner;
    partner.partner = root_user;

    update_user(root_user);
    update_user(partner);
}