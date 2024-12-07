"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heading, Input, Flex } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';

export default function RegisterWorkout() {
    const [name, setName] = useState('');
    // const [format, setFormat] = useState('unparttitioned');

    const router = useRouter();

    const resetData = () => {
        localStorage.removeItem("workoutTime");
        localStorage.removeItem("phaseIndex");
        localStorage.removeItem("phases");
    }

    const handleStart = () => {
        // TODO: add toast
        if (!name) return alert('Por favor, insira um nome válido.')
        localStorage.setItem('currentUser', JSON.stringify({ name, format: "unpartitioned" }));
        resetData();
        router.push('workout')
    }

    return (
        <Flex p={4} gap="4" direction="column" backgroundColor="blackAlpha.950" w="60%">
            <Heading>Registro de treino</Heading>
            <label>Nome</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='Digite seu nome' />

            {/* <label>Formato do Treino</label> */}
            {/* <select value={format} onChange={(e) => setFormat(e.target.value)}>
                <option value="unpartitioned">Unpartitioned</option>
                <option value="partitioned">Séries</option>
            </select> */}
            <Button colorScheme="blue" onClick={handleStart}>Start</Button>
            <Button colorScheme="blue" onClick={() => router.push("/")}>Voltar ao início</Button>
        </Flex>
    )
}