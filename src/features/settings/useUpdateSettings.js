import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSettingsMutation } = useMutation(
    {
      mutationFn: updateSetting,
      onSuccess: () => {
        toast.success("Settings successfully updated");
        queryClient.invalidateQueries({ queryKey: ["settings"] });
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return { isUpdating, updateSettingsMutation };
};

export default useUpdateSettings;
