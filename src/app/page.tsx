"use client"

import { Button } from "@/components/ui/button";
import { Flex, Heading } from "@chakra-ui/react";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

  return (
    <Flex p={4} gap="4" direction="column">
      <Heading>WOD Murph</Heading>
      <Button colorScheme='blue' onClick={() => router.push('/register-workout')}>Start</Button>
      <Button colorScheme='teal' onClick={() => router.push('/last-timer')}>Last timer</Button>
    </Flex>
  );
}
