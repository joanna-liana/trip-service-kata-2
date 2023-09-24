import "jest";

import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";

describe("Get trips by user use case", () => {
    it("does not allow to use the system without logging in", () => {
        const sut = new TripService({ getLoggedUser: () => null });

        expect(() => sut.getTripsByUser(new User())).toThrowError(UserNotLoggedInException);
    });
});
