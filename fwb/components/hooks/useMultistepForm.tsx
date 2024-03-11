import { ReactElement, useState } from 'react'

const useMultistepForm = (steps: ReactElement[]) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0) // Track current page on multistep form

    // This function moves to the next page of the form
    function next() {
        setCurrentStepIndex((i) => {
            if (i >= steps.length - 1) return i // Edge case: Last page of the form
            return i + 1
        })
    }
    //This function moves to the previous page of the form
    function back() {
        setCurrentStepIndex((i) => {
            if (i <= 0) return i // Edge case: First page of the form
            return i - 1
        })
    }
    function goTo(index: number) {
        setCurrentStepIndex(index)
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        goTo,
        next,
        back,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
    }
}

export default useMultistepForm
