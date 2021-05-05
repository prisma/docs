import * as React from 'react';
import styled from 'styled-components';

type AnswerOptions = {
    answer: string;
    isCorrect: boolean;
}

interface QuestionAndAnswer {
    question: string;
    answerOptions: AnswerOptions[];
}

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: #edf2f7;
    border-top-right-radius: 9px;
    border-bottom-right-radius: 9px;
    min-height: 100px;
    border-left: 2px solid #2D3748;
    margin: 2rem 0;
`;

const QuestionTitle = styled.h3`
    display: flex;
    font-size: 1.25rem;
    width: 100%;
    margin: 0 0 20px 20px;

    & > span {
        align-self: center;
        margin-left: 0.5rem;
    }
`;

const AnswersWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 20px;
`;

const Answer = styled.div`
    display: flex;
    margin: 0.25rem 0;
    font-weight: 500;
    border-bottom: 1px solid #3182ce;
    padding-bottom: 0.25rem;
    background-color: #f6f8fa;

    &:hover {
        background-color: #E5EBF1;
        cursor: pointer;
    }

    & > span {
        align-self: center;
        margin-left: 0.5rem;
    }
`;

const ChosenAnswer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;

    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
        min-width: 100px;
        border-bottom: 2px solid #3182ce;
        font-weight: 500;
    }
`;

const Quiz = ({question, answerOptions}: QuestionAndAnswer) => {
    const [chosenAnswer, setChosenAnswer] = React.useState('');

    const handleAnswer = (isCorrect: boolean) => {
        console.log({isCorrect})
        if (isCorrect) {
            const answerText = answerOptions.find((answer) => answer.isCorrect);
            const correctAnswerText = `Correct! ${answerText?.answer}`
            setChosenAnswer(correctAnswerText);
        } else {
            const wrongAnswerText = `Oh no! Please read through the above section and try again.`
            setChosenAnswer(wrongAnswerText);
        }
    }

    return (
        <Wrapper>
            <QuestionTitle>
                🙋
                <span>{question}</span>
            </QuestionTitle>
            {answerOptions.map((item, index) => (
                <AnswersWrapper key={index}>
                    <Answer onClick={() => handleAnswer(item.isCorrect)}>
                    🤔
                    <span>{item.answer}</span>
                    </Answer>
                </AnswersWrapper>
            ))}
            {chosenAnswer !== '' ? (
                <ChosenAnswer>
                    <div>
                       {chosenAnswer}
                    </div>
                </ChosenAnswer>
            ) : null}
        </Wrapper>
    )
}

export default Quiz;