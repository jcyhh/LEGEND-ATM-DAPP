import confetti from 'canvas-confetti';

export function useConfetti () {
    const showConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.8 },
            zIndex: 9999
        })
    }

    return {
        showConfetti
    }
}