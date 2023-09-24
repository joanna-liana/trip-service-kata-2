import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
    constructor(
        private readonly userSession: typeof UserSession,
        private readonly findTripsByUser: (user: User) => Trip[] = TripDAO.findTripsByUser
    ) {}

    public getTripsByUser(user: User): Trip[] {
        let tripList: Trip[] = [];
        const loggedUser: User = this.userSession.getLoggedUser();
        let isFriend: boolean = false;

        if (!loggedUser) {
            throw new UserNotLoggedInException();
        }

        for (const friend of user.getFriends()) {
            if (friend === loggedUser) {
                isFriend = true;
                break;
            }
        }

        if (isFriend) {
            tripList = this.findTripsByUser(user);
        }

        return tripList;
    }
}
