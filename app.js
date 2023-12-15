let level;
let lowest_level;
let highest_level;

let Users = [];

class User {
    constructor(name, level, gender) {
        this.name = name;
        this.level = level;
        this.gender = gender;
        this.partner = null;
        this.children = [];
        this.siblings = [];
    }

    add_partner(partner) {
        this.partner = partner;
    }

    add_children(children) {
        this.children = [...this.children, ...children];
    }

    add_siblings(siblings) {
        this.siblings = [...this.siblings, ...siblings];
    }
}

function find_or_create_person(name, level, gender) {
    let user = Users.find(u => u.name === name);
    if (!user) {
        user = new User(name, level, gender);
        Users.push(user);
    }
    return user;
}

