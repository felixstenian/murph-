"use client"

import { useState, useEffect, useRef } from "react";
import {  Box, Button, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Workout() {
  const router = useRouter();
  const timerRef = useRef<number | NodeJS.Timeout>(0);

  const isClient = typeof window !== "undefined";

  const [time, setTime] = useState(() => {
    if (!isClient) return 0;
    const savedTime = localStorage?.getItem("workoutTime");
    return savedTime ? parseInt(savedTime, 10) : 0;
  });

  // TODO: create util
  const formatTime = (seconds: number) => {
    if (!isClient) return 0;
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  const [phaseIndex, setPhaseIndex] = useState(() => {
    if (!isClient) return 0;
    const savedIndex = localStorage?.getItem("phaseIndex");
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  
  const [phases, setPhases] = useState(() => {
    if (!isClient) return [];
    const savedPhases = localStorage?.getItem("phases");
    return savedPhases
      ? JSON.parse(savedPhases)
      : [
          { name: "1.6 KM Run", totalReps: 1, completedReps: 0, phaseTime: 0 },
          { name: "Pull-Ups", totalReps: 100, completedReps: 0, phaseTime: 0 },
          { name: "Push-Ups", totalReps: 200, completedReps: 0, phaseTime: 0 },
          { name: "Air Squats", totalReps: 300, completedReps: 0, phaseTime: 0 },
          { name: "1.6 KM Run", totalReps: 1, completedReps: 0, phaseTime: 0 },
        ];
  });

  useEffect(() => {
    if (phaseIndex < phases.length) {
      timerRef.current = setInterval(() => {
        setTime((prev) => {
          const newTime = prev + 1;
          localStorage?.setItem("workoutTime", String(newTime));
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [phaseIndex, phases.length]);

  useEffect(() => {
    localStorage?.setItem("phaseIndex", String(phaseIndex));
    localStorage?.setItem("phases", JSON.stringify(phases));
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
      <Flex align="center" p={4} gap="4" direction="column" backgroundColor="blackAlpha.950" w="60%">
        <Heading>Parabéns! 🎉</Heading>
        <Text>Tempo: {formatTime(time)}</Text>
        {phases?.map((phase: { name: string, phaseTime: number }, idx: number) => (
          <Text key={idx}>
            {phase.name}: {formatTime(phase.phaseTime - (phases[idx - 1]?.phaseTime || 0))}
          </Text>
        ))}
        <Button colorScheme="blue" onClick={() => router.push("/")}>Voltar ao início</Button>
      </Flex>
    );
  }

  const getSrcImagesWorkouts = () => {
    if (phases[phaseIndex].name.includes("Run")) return 'https://media.tenor.com/tscJ0nIN-4UAAAAM/degabotuviceoyunageli%CC%87nceka%C3%A7argi%CC%87bi%CC%87.gif'
    if (phases[phaseIndex].name.includes("Pull-Ups")) return 'https://media4.giphy.com/media/LDZZolICZSt3nSx9IM/giphy.gif?cid=6c09b952xt36oi2o785c35oigq99kuj86yzooes0p2s6jx5h&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g'
    if (phases[phaseIndex].name.includes("Push-Ups")) return 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGxlb3pwbm5wYzN6eW5vZnI3YWhrYmQxeXB4ZWJ2Zmk1aXh0dXBwMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3pY8FQP9uMtDKXkYqX/giphy.webp'
    if (phases[phaseIndex].name.includes("Air Squats")) return 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGk3cDBpbnU3dzRzbzh5czBna3k4bWd3YWR2ZWw1eHdnNHl4Z3poZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aT4gLVz0A9ROxqLgI1/giphy.webp'
  };

  return (
    <Flex align="center" p={4} gap="4" direction="column" backgroundColor="blackAlpha.950" w="60%">
      <Heading>{phases[phaseIndex].name}</Heading>
      <Text>Tempo: {formatTime(time)}</Text>
      <Text>
        {phases[phaseIndex].name.includes("Run") ? ( '1.6 km Restante' ) : (
          <Text>Repetições restantes: {phases[phaseIndex].totalReps - phases[phaseIndex].completedReps}</Text>
        )}
      </Text>
      {phases[phaseIndex].name.includes("Run") ? (
        <Button colorScheme="blue" onClick={() => handleRepCompletion(1)}>
          Concluir Corrida
        </Button>
      ) : (
        <Box>
          {[1, 5, 10, 20]?.map((value) => (
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
      <Image src={getSrcImagesWorkouts()} alt="workout" />
    </Flex>
  );
}
