export default class MenuItem {
    _id;
    _name;
    _link;
    _megamenu;
    constructor(id, name, link, megamenu){
        this._id = id;
        this._name = name;
        this._link = link;
        this._megamenu = megamenu;
    }
}