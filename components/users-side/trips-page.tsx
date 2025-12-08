"use client";
import FieldContainer from "../shared/field-container";
import TripSquareCard from "../shared/trip-square-card";
import { mockedTrips } from "@/utils/mock-trips";

export default function TripsPage() {
    return (
        <div>
            <FieldContainer isTripList={true}>
                {mockedTrips.map((trip, index) => (
                    <TripSquareCard
                        key={index}
                        from={trip.from}
                        to={trip.to}
                        date={trip.date}
                        time={trip.time}
                        description={trip.description}
                        seatsConfirmed={trip.seatsConfirmed}
                        seatsAvailable={trip.seatsAvailable}
                        excales={trip.excales}
                        ownerFullName={trip.ownerFullName}
                        ownerAvatarUrl={trip.ownerAvatarUrl}
                        createdAt={trip.createdAt}
                        associatedEventName={trip.associatedEventName}
                        status={trip.status}
                        price={trip.price}
                    />
                ))}
            </FieldContainer>
        </div>
    );
}
