'use client'

import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function LastTimer() {
    const router = useRouter();

    const time = localStorage.getItem("workoutTime");

    const phases = JSON.parse(localStorage.getItem("phases") ?? '');

    // TODO: create util
    const formatTime = (seconds: any) => {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${secs}`;
    };

      return (
        <Flex align="center" p={4} gap="4" direction="column">
          <Heading>Seu ultimo registro foi:</Heading>
          <Text>Tempo: {formatTime(time)}</Text>
          {phases.map((phase: { name: string, phaseTime: number }, idx: number) => (
            <Text key={idx}>
              {phase.name}: {formatTime(phase.phaseTime - (phases[idx - 1]?.phaseTime || 0))}
            </Text>
          ))}
          <Button colorScheme="blue" onClick={() => router.push("/")}>Voltar ao início</Button>
        </Flex>
      );
}