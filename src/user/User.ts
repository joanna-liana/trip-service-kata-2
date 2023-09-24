export default class User {
    private friends: User[] = [];

    public addFriend(user: User): void {
        this.friends.push(user);
    }

    public isFriendsWith(anotherUser: User) {
        return this.friends.some(friend => friend === anotherUser);
    }
}
