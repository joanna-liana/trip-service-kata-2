import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
    constructor(
        private readonly userSession: typeof UserSession,
        private readonly findTripsBy: (user: User) => Trip[] = TripDAO.findTripsByUser
    ) {}

    public getTripsByUser(user: User): Trip[] {
        const requester = this.ensureRequester();

        return user.isFriendsWith(requester) ?
            this.findTripsBy(user) :
            [];

    }

    private ensureRequester() {
        const requester = this.userSession.getLoggedUser();

        if (!requester) {
            throw new UserNotLoggedInException();
        }

        return requester;
    }
}
