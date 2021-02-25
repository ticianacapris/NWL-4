import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json'

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;


}

interface ChallengeContextData {
    level: number;
    levelUp: ()=>void;
    currentExperience: number;
    challengedCompleted: number;
    startNewChallenge: ()=>void;
    activeChallenge:Challenge;
    resetChallenge: ()=>void;
    experienceToNextLevel: number;
    completeChallenge: ()=>void;

}

interface ChallengeProviderProps {
    children: ReactNode;

}

export const ChallengesContext = createContext({}as ChallengeContextData);

export function ChallengesProvider({ children }: ChallengeProviderProps) {

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengedCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel =Math.pow((level+1)*4,2)

    useEffect(()=>{
        Notification.requestPermission();
    },[])

    function levelUp() {

        setLevel(level + 1);

    }
    function startNewChallenge() {
        console.log('New challenge');
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();

        if(Notification.permission=='granted'){
            new Notification('Novo Desafio', {
                body: `Valendo ${challenge.amount}xp`
            })

        }

    }

    function resetChallenge() {
        setActiveChallenge(null);

    }

    function completeChallenge() {
        if(!activeChallenge) {
            return;
    }

    const {amount}= activeChallenge;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
        finalExperience = finalExperience - experienceToNextLevel;
        levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengedCompleted + 1);

  

    }

   

    return (
        <ChallengesContext.Provider
            value={{
                level,
                levelUp,
                currentExperience,
                challengedCompleted,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge
                
                
            }}>
            {children}

        </ChallengesContext.Provider>

    );

}