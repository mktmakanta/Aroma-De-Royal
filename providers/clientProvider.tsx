"use client";

import { store } from "@/lib/store";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
<<<<<<< HEAD
=======
      {" "}
>>>>>>> fa0e7071ff444ff6d30f33d883a7877f3e88ad3e
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
}
