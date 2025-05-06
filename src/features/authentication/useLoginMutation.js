import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useLoginMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: loginMutation, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user", data.user]);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { loginMutation, isLoading };
};

export default useLoginMutation;
