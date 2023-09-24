import "jest";

import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";

describe("Get trips by user use case", () => {
    it("does not allow to use the system without logging in", () => {
        // given
        const user = new User();
        const sessionWithoutUser = { getLoggedUser: () => null };
        const sut = new TripService(sessionWithoutUser);

        // when, then
        expect(() => sut.getTripsByUser(user)).toThrowError(UserNotLoggedInException);
    });
});
