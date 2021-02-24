import { createContext, useState, ReactNode } from 'react';
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
    const experienceToNextLevel =Math.pow((level+1),2)

    function levelUp() {

        setLevel(level + 1);

    }
    function startNewChallenge() {
        console.log('New challenge');
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)

    }

    function resetChallenge() {
        setActiveChallenge(null);

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
                
            }}>
            {children}

        </ChallengesContext.Provider>

    );

}