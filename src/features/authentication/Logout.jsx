import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogoutMutation from "./useLogoutMutation";
import SpinnerMini from "../../ui/SpinnerMini";

const Logout = () => {
  const { logoutMutation, isLoading } = useLogoutMutation();
  return (
    <ButtonIcon onClick={logoutMutation} disabled={isLoading}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
};

export default Logout;
