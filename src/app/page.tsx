"use client"

import { Button } from "@/components/ui/button";
import { Flex } from "@chakra-ui/react";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

  return (
    <Flex 
      p={4} 
      gap="4" 
      mt={350}
      direction="column"
      backgroundColor="blackAlpha.950"
      w="20rem"
      maxW="30rem"
    >
      <Button colorScheme='blue' onClick={() => router.push('/register-workout')}>Start</Button>
      <Button colorScheme='teal' onClick={() => router.push('/last-timer')}>Last timer</Button>
    </Flex>
  );
}
