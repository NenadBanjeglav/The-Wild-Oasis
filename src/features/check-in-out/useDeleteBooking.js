import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBookingMutation } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("Booking successfully deleted!");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBookingMutation };
};

export default useDeleteBooking;
