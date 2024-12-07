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
          <Container 
            h='100vh'
            backgroundImage="url(https://valentingenest.com/wp-content/uploads/2024/07/Murph-Crossfit-1.jpg)"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundPosition="center"
          >
            <AbsoluteCenter w='100%' h='100vh'>
              {children}
            </AbsoluteCenter>
          </Container>
        </Provider>
      </body>
    </html>
  );
}
