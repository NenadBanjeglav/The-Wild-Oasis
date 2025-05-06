import styled from "styled-components";
import useFetchCurrentUser from "../features/authentication/useFetchCurrentUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  // Load the authenticated user
  const { isLoading, isAuthenticated } = useFetchCurrentUser();

  //if there is no authenticated user redirect to the login page
  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate("/login");
  }, [isLoading, isAuthenticated, navigate]);

  //while loading show a spinner

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //if there is user render the app
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
