import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useMoveBack } from "../../hooks/useMoveBack";
import useFetchBooking from "./useFetchBooking";
import { useNavigate } from "react-router-dom";
import useCheckoutBooking from "../check-in-out/useCheckoutBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "../check-in-out/useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useFetchBooking();
  const { checkout, isLoading: isCheckingOut } = useCheckoutBooking();
  const { deleteBookingMutation, isDeleting } = useDeleteBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const status = booking?.data?.status || "";
  const id = booking?.data?.id;
  if (isLoading) return <Spinner />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking.data} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${id}`)}>Check In</Button>
        )}

        {status === "checked-in" && (
          <Button disabled={isCheckingOut} onClick={() => checkout?.(id)}>
            Check Out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() => {
                deleteBookingMutation(id, {
                  onSettled: () => navigate("/bookings"),
                });
              }}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
