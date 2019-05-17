module.exports = class Authorizer {
    constructor(user, song){
        this.user = user;
        this.song = song;
    };

    _isAdmin() {
        return !!this.user && this.user.role === 'admin';
    }

    _isPremium() {
        return this.user && this.user.role === 'premium';
    }

    new() {
        return !!this.user && this._isAdmin();
    }

    create() {
        return this.new();
    }

    delete() {
        return /*!!this.song &&*/ this.new();
    }

    edit() {
        return this.delete();
    }

    update() {
        return this.new() && !!this.song;
    }
}