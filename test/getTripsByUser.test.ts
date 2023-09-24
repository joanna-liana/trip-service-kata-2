import "jest";

import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import Trip from "../src/trip/Trip";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import UserSession from "../src/user/UserSession";

describe("Get trips by user use case", () => {
    describe("given a logged in requester", () => {
        let requester: User;
        let sessionWithUser: typeof UserSession;
        let sut: TripService;


        beforeEach(() => {
            requester = new User();
            sessionWithUser = { getLoggedUser: () => requester };
            sut = new TripService(sessionWithUser);
        });

        it.each([
            ["no trips", []],
            ["single trip", new Trip()],
            ["multiple trips", new Trip(), new Trip()]
        ])(
            "returns a trip list if the requester is a friend of the queried user - %s",
            (_description, trips: Trip[]) => {
                // given
                const friend = new User();
                friend.addFriend(requester);
                sut = new TripService(sessionWithUser, () => trips);

                // when
                const tripList = sut.getTripsByUser(friend);

                // then
                expect(tripList).toStrictEqual(trips);
            }
        );

        it("returns an empty result if the requester is not a friend of the queried user", () => {
            // when
            const nonFriend = new User();
            const tripList = sut.getTripsByUser(nonFriend);

            // then
            expect(tripList).toStrictEqual([]);
        });

        it("returns an empty result if the user tries to list their own trips", () => {
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
