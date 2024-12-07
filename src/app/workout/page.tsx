'use client'

import { useState, useEffect, useRef } from "react";
import {  Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Workout() {
  const router = useRouter();
  const timerRef = useRef<number | NodeJS.Timeout>(0);


  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem("workoutTime");
    return savedTime ? parseInt(savedTime, 10) : 0;
  });

  // TODO: create util
  const formatTime = (seconds: number) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  const [phaseIndex, setPhaseIndex] = useState(() => {
    const savedIndex = localStorage.getItem("phaseIndex");
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  
  const [phases, setPhases] = useState(() => {
    const savedPhases = localStorage.getItem("phases");
    return savedPhases
      ? JSON.parse(savedPhases)
      : [
          { name: "1 Mile Run", totalReps: 1, completedReps: 0, phaseTime: 0 },
          { name: "Pull-Ups", totalReps: 100, completedReps: 0, phaseTime: 0 },
          { name: "Push-Ups", totalReps: 200, completedReps: 0, phaseTime: 0 },
          { name: "Air Squats", totalReps: 300, completedReps: 0, phaseTime: 0 },
          { name: "1 Mile Run", totalReps: 1, completedReps: 0, phaseTime: 0 },
        ];
  });

  useEffect(() => {
    if (phaseIndex < phases.length) {
      timerRef.current = setInterval(() => {
        setTime((prev) => {
          const newTime = prev + 1;
          localStorage.setItem("workoutTime", String(newTime));
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [phaseIndex, phases.length]);

  useEffect(() => {
    localStorage.setItem("phaseIndex", String(phaseIndex));
    localStorage.setItem("phases", JSON.stringify(phases));
  }, [phaseIndex, phases]);

  const handleRepCompletion = (reps: number) => {
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex].completedReps += reps;
    if (updatedPhases[phaseIndex].completedReps >= updatedPhases[phaseIndex].totalReps) {
      updatedPhases[phaseIndex].phaseTime = time;
      setPhaseIndex((prev) => prev + 1);
    }
    setPhases(updatedPhases);
  };

  if (phaseIndex >= phases.length) {
    clearInterval(timerRef.current);
    return (
      <Flex align="center" p={4} gap="4" direction="column">
        <Heading>Parabéns! 🎉</Heading>
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

  return (
    <Flex align="center" p={4} gap="4" direction="column">
      <Heading>{phases[phaseIndex].name}</Heading>
      <Text>Tempo: {formatTime(time)}</Text>
      <Text>
        Repetições restantes: {phases[phaseIndex].totalReps - phases[phaseIndex].completedReps}
      </Text>
      {phases[phaseIndex].name.includes("Run") ? (
        <Button colorScheme="blue" onClick={() => handleRepCompletion(1)}>
          Concluir Corrida
        </Button>
      ) : (
        <Box>
          {[1, 5, 10, 20].map((value) => (
            <Button
              key={value}
              colorScheme="teal"
              m={2}
              onClick={() => handleRepCompletion(value)}
            >
              -{value}
            </Button>
          ))}
        </Box>
      )}
    </Flex>
  );
}
