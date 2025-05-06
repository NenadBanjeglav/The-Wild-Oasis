import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useFetchBooking from "../bookings/useFetchBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckinBooking from "./useCheckinBooking";
import useFetchSettings from "../settings/useFetchSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking, isLoading } = useFetchBooking();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { checkin, isLoading: isCheckingIn } = useCheckinBooking();
  const { settings, isLoading: isLoadingSettings } = useFetchSettings();

  useEffect(() => {
    setConfirmPaid(booking?.data?.isPaid ?? false);
    setAddBreakfast(booking?.data?.hasBreakfast ?? false);
  }, [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const bookingId = booking?.data?.id;
  const guestName = booking?.data?.guests?.fullName;
  const totalPrice = booking?.data?.totalPrice;
  const numNights = booking?.data?.numNights;
  const numGuests = booking?.data?.numGuests;
  const hasBreakfast = booking?.data?.hasBreakfast;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking.data} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((prev) => !prev);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prev) => !prev)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guestName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `
            ${formatCurrency(
              totalPrice + optionalBreakfastPrice
            )} (${formatCurrency(totalPrice)} +${formatCurrency(
                optionalBreakfastPrice
              )})
          `}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
