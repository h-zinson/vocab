import { useState } from "react";
import { useNavigate } from "react-router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/singup";
import { signUp } from "../lib/sign-up";

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const username = `${data.firstName}${data.lastName}`.toLowerCase();
      await signUp(data.email, data.password, username);
      setSuccess(true);
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to create account. Please try again";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return <div>Account created! Redirecting...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <div>{error}</div>}

      <input type="text" placeholder="First Name" {...register("firstName")} />
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <input type="text" placeholder="Last Name" {...register("lastName")} />
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <input type="email" placeholder="Email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" placeholder="Password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUpPage;
