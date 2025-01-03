"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [login, setLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Estado para el loading
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    setIsLoading(true); 
    try {
      if (login) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col md:items-center md:justify-center md:bg-transparent">
       {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity opacity-100">
          <div className="flex flex-col items-center">
            <p className="mt-4 text-white text-lg font-semibold">Processing...</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold text-white">{login ? "Sign In" : "Sign Up"}</h1>
        {errorMessage && (
          <div className="text-red-500 text-center mt-4">{errorMessage}</div>
        )}
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#e50914] focus:border-[#e50914] transition duration-200"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>

          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#e50914] focus:border-[#e50914] transition duration-200"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-yellow-400 hover:bg-yellow-500 py-3 font-semibold text-black transition duration-200"
        >
          {login ? "Sign In" : "Sign Up"}
        </button>

        <button
          type="button"
          onClick={() => {
            setLogin(!login);
            setErrorMessage(null);
          }}
          className="w-full rounded-lg bg-gray-700 py-3 font-semibold text-white hover:bg-gray-600 transition duration-200"
        >
          {login ? "Create an Account" : "Already have an account? Sign In"}
        </button>
      </form>
    </div>
  );
}

export default Login;
