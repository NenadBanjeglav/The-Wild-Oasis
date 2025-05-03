import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

const useFetchSettings = () => {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, error, settings };
};

export default useFetchSettings;
