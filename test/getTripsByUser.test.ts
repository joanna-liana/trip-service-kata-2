import "jest";

import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import TripDAO from "../src/trip/TripDAO";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import UserSession from "../src/user/UserSession";

jest.mock("../src/trip/TripDAO");

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

        it("returns a trip list if the requester is a friend of the queried user", () => {
            // given
            const trips = [];
            const friend = new User();
            friend.addFriend(requester);
            TripDAO.findTripsByUser = jest.fn().mockReturnValue(trips);
            sut = new TripService(sessionWithUser);

            // when
            const tripList = sut.getTripsByUser(friend);

            // then
            expect(tripList).toStrictEqual(trips);
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
