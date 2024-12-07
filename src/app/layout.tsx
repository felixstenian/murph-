"use client"

import { Provider } from "@/components/ui/provider"
import { AbsoluteCenter, Container } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        <Provider>
          <Container h='100vh'>
            <AbsoluteCenter w='100%'>
              {children}
            </AbsoluteCenter>
          </Container>
        </Provider>
      </body>
    </html>
  );
}
