import { createContext, useState, ReactNode } from 'react';



interface ChallengeContextData {
    level: number;
    levelUp: ()=>void;
    currentExperience: number;
    challengedCompleted: number;
    startNewChallenge: ()=>void;

}

interface ChallengeProviderProps {
    children: ReactNode;

}

export const ChallengesContext = createContext({}as ChallengeContextData);

export function ChallengesProvider({ children }: ChallengeProviderProps) {

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengedCompleted, setChallengesCompleted] = useState(0);

    function levelUp() {

        setLevel(level + 1);

    }
    function startNewChallenge() {
        console.log('New challenge');

    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                levelUp,
                currentExperience,
                challengedCompleted,
                startNewChallenge,
            }}>
            {children}

        </ChallengesContext.Provider>

    );

}