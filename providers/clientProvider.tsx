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
>>>>>>> 1c6c1d92987b8d6df3575799ec2c775e8af08d7f
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
}
