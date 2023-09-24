import "jest";

import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";

describe("Get trips by user use case", () => {
    describe("given a logged in requester", () => {
        it("returns a trip list if the requester is a friend of the queried user", () => {
            // given
            const requester = new User();
            const friend = new User();
            friend.addFriend(requester);
            const sessionWithUser = { getLoggedUser: () => requester };
            const sut = new TripService(sessionWithUser);

            // when
            const tripList = sut.getTripsByUser(friend);

            // then
            expect(tripList).toStrictEqual([]);
        });

        it("returns an empty result if the user tries to list their own trips", () => {
            // given
            const requester = new User();
            const sessionWithUser = { getLoggedUser: () => requester };
            const sut = new TripService(sessionWithUser);

            // when
            const tripList = sut.getTripsByUser(requester);

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
