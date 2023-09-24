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
        const requester: User = this.userSession.getLoggedUser();

        if (!requester) {
            throw new UserNotLoggedInException();
        }

        if (!user.isFriendsWith(requester)) {
            return [];
        }

        return this.findTripsByUser(user);
    }
}
