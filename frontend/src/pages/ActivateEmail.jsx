import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { USER_VERIFICATION } from "../graphQL.js";
import Loading from "../components/Loading";

export default function ActivateEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [verifyUser] = useMutation(USER_VERIFICATION, {
    onCompleted: (data) => {
      if (data.userVerification.success) {
        navigate("/");
        return;
      }
      window.alert("Failed to verify");
    },
  });

  useEffect(() => {
    verifyUser({
      variables: {
        token: token,
      },
    });
  }, [verifyUser, token]);

  return <Loading />;
}
