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
        const loggedRequester: User = this.userSession.getLoggedUser();

        if (!loggedRequester) {
            throw new UserNotLoggedInException();
        }

        const isFriend = user.isFriendsWith(loggedRequester);

        if (!isFriend) {
            return [];
        }

        return this.findTripsByUser(user);
    }
}
