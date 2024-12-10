"use client";

import { store } from "@/lib/store";
import { Provider } from "react-redux";

export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={store}>{children}</Provider>;
}
