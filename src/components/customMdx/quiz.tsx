import * as React from 'react'
import styled from 'styled-components'

type AnswerOptions = {
  answer: string
  isCorrect: boolean | null
}

interface QuestionAndAnswer {
  question: string
  answerOptions: AnswerOptions[]
}

interface ChosenAnswerProps {
  isCorrect: boolean
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: 'flex-start;
  padding: 1rem;
  background-color: ${p => p.theme.colors.gray100};
  border-radius: 8px;
  min-height: 100px;
  border-left: 8px solid ${p => p.theme.colors.gray500};
  margin: 2rem 0;
`

const QuestionTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  width: 100%;
  margin: 0.55rem;
`

const AnswersWrapper = styled.label`
  & > span {
    align-self: center;
    margin-left: 0.5rem;
  }
`

const ChosenAnswer = styled.div<ChosenAnswerProps>`
  background-color: ${props => (props.isCorrect ? '#A3F5D3' : '#F5B7B7')};
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  border-radius: 8px;
  border: ${props => (props.isCorrect ? '2px solid #15bd76' : '2px solid #ff4f56')};

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem;
    min-width: 100px;
    font-weight: 500;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2rem 0.5rem 0 0.5rem;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  position: relative;
  margin-left: 0.55rem;

  & > span {
    font-size: 0.85rem;
  }
`

const RadioButtonLabel = styled.label`
  position: absolute;
  top: 15%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 2px solid ${p => p.theme.colors.gray600};
`
const RadioButton = styled.input<ChosenAnswerProps>`
  opacity: 0;
  z-index: 1;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-right: 0.25rem;
  cursor: pointer;
  &:hover ~ ${RadioButtonLabel} {
    background: ${p => p.theme.colors.gray500};
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 10px;
      height: 10px;
      margin: 3px;
      background: ${p => p.theme.colors.gray100};
    }
  }
  ${props =>
    props.checked &&
    ` 
    &:checked + ${RadioButtonLabel} {
      background: #3182ce;
      border: 1px solid #c3dafe;
      &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        margin: 4px;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
        background: white;
      }
    }
  `}

  ${props =>
    props.disabled &&
    ` &:disabled + ${RadioButtonLabel} {
      background: #a0aec0;
      border: 1px solid #c3dafe;
      &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        margin: 4px;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
        background: white;
      }
    }
  `}
`

function Tick() {
  return (
    <svg
      width="35px"
      height="35px"
      fill="#15bd76"
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      viewBox="0 0 100 125"
    >
      <path d="M79.8 29.1c-1.2-1.2-3.1-1.2-4.2 0L40.9 63.8 26.5 49.4c-1.2-1.2-3.1-1.2-4.2 0-1.2 1.2-1.2 3.1 0 4.2l16.5 16.5c.6.6 1.4.9 2.1.9s1.5-.3 2.1-.9l36.8-36.8c1.1-1.1 1.1-3 0-4.2z"></path>
    </svg>
  )
}

const Button = styled.button<ChosenAnswerProps>`
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  display: inline-block;
  background: ${props =>
    props.isCorrect ? p => p.theme.colors.gray100 : p => p.theme.colors.gray300};
  text-align: left;
  border-radius: 5px;
  line-height: 1.5;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  border: none;
  color: ${p => p.theme.colors.gray700};
  transition: 0.2s ease-out;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  &:hover {
    background: ${p => p.theme.colors.gray400};
  }
  &:active {
    transform: scale(0.98);
  }
  &:disabled {
    background: ${p => p.theme.colors.gray400};
    color: ${p => p.theme.colors.gray700};
    cursor: default;
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${p => p.theme.colors.gray100};

    & > p {
      color: #15bd76;
      margin: 0 0 0 0.25rem;
    }
  }
`

const Quiz = ({ question, answerOptions }: QuestionAndAnswer) => {
  const [chosenAnswer, setChosenAnswer] = React.useState<AnswerOptions>({
    answer: '',
    isCorrect: null,
  })
  const [answerSubmitted, setAnswerSubmitted] = React.useState<boolean>(false)
  const [disabled, setDisabled] = React.useState<boolean>(false)

  const handleSelectChange = (event: any) => {
    console.log(event.target.value)
    setChosenAnswer({
      answer: event.target.value,
      isCorrect: false,
    })
  }

  const onSubmit = () => {
    setAnswerSubmitted(true)
    setDisabled(true)
    const foundAnswer = answerOptions.find(answer => answer.answer === chosenAnswer.answer)
    if (foundAnswer && foundAnswer.isCorrect) {
      const correctAnswerText = `Correct! ${foundAnswer.answer}`
      setChosenAnswer({
        answer: correctAnswerText,
        isCorrect: true,
      })
    } else {
      const wrongAnswerText = `Oh no! Please read through the section again.`
      setChosenAnswer({
        answer: wrongAnswerText,
        isCorrect: false,
      })
    }
  }

  const onReset = () => {
    setAnswerSubmitted(false)
    setChosenAnswer({
      answer: '',
      isCorrect: false,
    })
    setDisabled(false)
  }

  return (
    <Wrapper>
      <QuestionTitle>
        <span>{question}</span>
      </QuestionTitle>
      {answerOptions.map((item, index) => (
        <AnswersWrapper key={index}>
          <Row>
            <RadioButton
              isCorrect={!!chosenAnswer.isCorrect}
              disabled={disabled}
              type="radio"
              name="radio"
              value={item.answer}
              checked={chosenAnswer.answer === item.answer}
              onChange={event => handleSelectChange(event)}
            />
            <RadioButtonLabel />
            <span>{item.answer}</span>
          </Row>
        </AnswersWrapper>
      ))}
      <ButtonsWrapper>
        <Button disabled={disabled} onClick={onSubmit}>
          {chosenAnswer.isCorrect ? (
            <div>
              <Tick />
              <p>Correct Answer!</p>
            </div>
          ) : !!chosenAnswer.isCorrect ? (
            'Try again'
          ) : (
            'Submit your answer'
          )}
        </Button>
      </ButtonsWrapper>
      {/* {answerSubmitted ? (
        <ChosenAnswer isCorrect={chosenAnswer.isCorrect}>
          <div>{chosenAnswer.answer}</div>
        </ChosenAnswer>
      ) : null} */}
    </Wrapper>
  )
}

export default Quiz
