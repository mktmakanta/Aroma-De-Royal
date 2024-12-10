"use client";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // We will handle the redirect manually
    });

    if (result?.error) {
      setError(result.error);
    } else if (result.ok) {
      // Use session storage to get the previous page
      const redirectUrl = sessionStorage.getItem("redirect") || "/dashboard";
      router.push(redirectUrl);
    }
  };

  return (
    <div className="max-w-md p-6 bg-white shadow-md rounded-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleCredentialsLogin} className="space-y-4">
        <div>
          <Label>Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Password:</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          Login with Credentials
        </Button>
      </form>

      <hr className="my-4" />

      <div className="flex justify-around mt-4">
        <Button
          onClick={() => signIn("google")}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Login with Google
        </Button>
        <Button
          onClick={() => signIn("github")}
          className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800"
        >
          Login with GitHub
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
