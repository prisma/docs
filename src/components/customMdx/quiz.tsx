import * as React from 'react'
import styled from 'styled-components'

type AnswerOptions = {
  answer?: string
  isCorrect: boolean
}

interface QuestionAndAnswer {
  question: string
  answerOptions: AnswerOptions[]
}

interface ChosenAnswerProps {
  isCorrect: boolean
  answerSubmitted?: boolean
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: 'flex-start;
  padding: 1rem;
  background-color: ${(p) => p.theme.colors.gray100};
  border-radius: 8px;
  min-height: 100px;
  border-left: 8px solid ${(p) => p.theme.colors.gray500};
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

const NotificationWrapper = styled.div<ChosenAnswerProps>`
  margin: ${(props) => (props.isCorrect ? '1rem 0.25rem' : '1rem 0.5rem')};
`

const Row = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  position: relative;
  margin-left: 0.5rem;

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
  border: 2px solid ${(p) => p.theme.colors.gray600};
`
const RadioButton = styled.input<ChosenAnswerProps>`
  opacity: 0;
  z-index: 1;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-right: 0.25rem;
  cursor: pointer;
  position: relative;

  ${(props) =>
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

  ${(props) =>
    props.isCorrect === true &&
    props.answerSubmitted &&
    props.answerSubmitted === true &&
    ` 
    & + ${RadioButtonLabel} {
      background: #15bd76;
      border: 1px solid #A3F5D3;
      &::after {
        color: white;
        content: "✔";
        font-size: 0.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        margin: 4px
      }
    }
  `}

  ${(props) =>
    props.isCorrect === false &&
    props.answerSubmitted &&
    props.answerSubmitted === true &&
    ` 
    & + ${RadioButtonLabel} {
      background: #ff4f56;
      border: 1px solid #F5B7B7;
      &::after {
        color: white;
        content: "✖";
        font-size: 0.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        margin: 0.2rem 0.2rem 0.3rem 0.28rem;
      }
    }
  `}
`

const Button = styled.button`
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  display: inline-block;
  background: ${(p) => p.theme.colors.gray300};
  text-align: left;
  border-radius: 5px;
  line-height: 1.5;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  border: none;
  color: ${(p) => p.theme.colors.gray700};
  transition: 0.2s ease-out;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  &:hover {
    background: ${(p) => p.theme.colors.gray400};
  }
  &:active {
    transform: scale(0.98);
  }
  &:disabled {
    background: ${(p) => p.theme.colors.gray400};
    color: ${(p) => p.theme.colors.gray700};
    cursor: default;
  }
`

const NotificationContainer = styled.div<ChosenAnswerProps>`
  display: flex;
  width: 250px;
  justify-content: flex-start;
  align-items: center;
  background: ${(p) => p.theme.colors.gray100};
  position: relative;

  ${(props) =>
    props.isCorrect === true &&
    `
      &::after {
        order: 0;
        background: #15bd76;
        border: 1px solid #A3F5D3;
        color: white;
        content: "✔";
        font-size: 0.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        margin: 0 0.75rem 0 0.3rem;
      }
  `}

  ${(props) =>
    props.isCorrect === false &&
    `
      &::after {
        order: 0;
        background: #ff4f56;
        border: 1px solid #F5B7B7;
        color: white;
        content: "✖";
        font-size: 0.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        margin: 0 0.75rem 0 0;
      }
  `}

  & > p {
    order: 1;
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => (props.isCorrect ? '#15bd76' : '#ff4f56')};
  }
`

const AnswerNotification = ({ isCorrect }: ChosenAnswerProps) => (
  <NotificationContainer isCorrect={isCorrect}>
    <p>{isCorrect ? `Yay, that's correct!` : `Oh no, that's incorrect!`}</p>
  </NotificationContainer>
)

const Quiz = ({ question, answerOptions }: QuestionAndAnswer) => {
  const [chosenAnswer, setChosenAnswer] = React.useState<AnswerOptions>({
    answer: '',
    isCorrect: false,
  })
  const [answerSubmitted, setAnswerSubmitted] = React.useState<boolean>(false)
  const [disabled, setDisabled] = React.useState<boolean>(false)

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChosenAnswer({
      answer: event.target.value,
      isCorrect: false,
    })
  }

  const onSubmit = () => {
    setAnswerSubmitted(true)
    setDisabled(true)
    const foundAnswer = answerOptions.find(
      (answer) => answer.answer === chosenAnswer.answer
    )?.isCorrect
    if (foundAnswer) {
      setChosenAnswer({
        isCorrect: true,
      })
    } else {
      setChosenAnswer({
        isCorrect: false,
      })
    }
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
              answerSubmitted={answerSubmitted}
              isCorrect={item.isCorrect}
              disabled={disabled}
              type="radio"
              name="radio"
              value={item.answer}
              checked={chosenAnswer.answer === item.answer}
              onChange={(event) => handleSelectChange(event)}
            />
            <RadioButtonLabel />
            <span>{item.answer}</span>
          </Row>
        </AnswersWrapper>
      ))}
      <NotificationWrapper isCorrect={chosenAnswer.isCorrect}>
        {answerSubmitted ? (
          <AnswerNotification isCorrect={chosenAnswer.isCorrect} />
        ) : (
          <Button disabled={disabled} onClick={onSubmit}>
            Submit your answer
          </Button>
        )}
      </NotificationWrapper>
    </Wrapper>
  )
}

export default Quiz
