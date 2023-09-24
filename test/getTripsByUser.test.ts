import "jest";

import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";

describe("Get trips by user use case", () => {
    describe("given a logged in user", () => {
        it("returns an empty trip list", () => {
            // given
            const user = new User();
            const sessionWithUser = { getLoggedUser: () => user };
            const sut = new TripService(sessionWithUser);

            // when
            const tripList = sut.getTripsByUser(user);

            // then
            expect(tripList).toStrictEqual([]);
        });
    });


    it("does not allow to use the system without logging in", () => {
        // given
        const user = new User();
        const sessionWithoutUser = { getLoggedUser: () => null };
        const sut = new TripService(sessionWithoutUser);

        // when, then
        expect(() => sut.getTripsByUser(user)).toThrowError(UserNotLoggedInException);
    });
});
