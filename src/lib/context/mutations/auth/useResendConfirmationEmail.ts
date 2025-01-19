import useRecipeApi from "../../useRecipeApi";
import { createMutation } from "@tanstack/svelte-query";

interface ResendConfirmationEmailProps {
  email: string;
}

const ResendConfirmationEmail = async ({
  email,
}: ResendConfirmationEmailProps) => {
  const api = useRecipeApi();
  const { data } = await api.post("/auth/resend", {
    email,
  });

  return data;
};

const useResendConfirmationEmail = () => {
  return createMutation({
    mutationFn: ResendConfirmationEmail,
  });
};

export default useResendConfirmationEmail;
