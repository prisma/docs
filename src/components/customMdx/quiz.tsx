import * as React from 'react'
import styled from 'styled-components'

type AnswerOptions = {
  answer: string
  isCorrect: boolean
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
  background-color: ${p => p.theme.colors.gray200};
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  min-height: 100px;
  border-left: 2px solid ${p => p.theme.colors.gray700};
  margin: 2rem 0;
`

const QuestionTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  width: 100%;
  margin: 0 0 1rem 0.55rem;

  & > span {
    align-self: center;
    margin-left: 0.5rem;
  }
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
  border: 2px solid ${p => p.theme.colors.gray500};
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

function QuestionMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      enableBackground="new 0 0 32 32"
      version="1.1"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      width="20px"
      height="20px"
    >
      <g fill="#3182ce">
        <path d="M17.6 30c0 1.102-.895 2-2 2s-2-.898-2-2c0-1.109.895-2 2-2s2 .891 2 2zM15.676 25.977a4.964 4.964 0 01-3.535-1.469c-.945-1.105-1.465-2.359-1.465-3.695s.52-2.59 1.465-3.371l6.688-6.688A3.983 3.983 0 0020 7.926c0-1.07-.416-2.074-1.172-2.828a4 4 0 00-5.654 0A3.958 3.958 0 0012 7.926H8c0-2.137.834-4.148 2.348-5.66 3.02-3.023 8.285-3.02 11.309.004A7.932 7.932 0 0124 7.926a7.942 7.942 0 01-2.344 5.656l-6.688 6.523a.999.999 0 101.707.703h4c0 1.336-.52 2.594-1.465 3.699a4.96 4.96 0 01-3.534 1.47z"></path>
      </g>
    </svg>
  )
}

const Button = styled.button`
  font-size: 1rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  display: inline-block;
  border: solid 2px ${p => p.theme.colors.gray700};
  background: inherit;
  text-align: left;
  border-radius: 5px;
  line-height: 1.5;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  color: ${p => p.theme.colors.gray700};
  transition: 0.2s ease-out;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  &:hover {
    background: ${p => p.theme.colors.gray600};
    color: #fff;
  }
  &:active {
    transform: scale(0.98);
  }
  &:disabled {
    background: ${p => p.theme.colors.gray400};
    color: ${p => p.theme.colors.gray700};
    cursor: default;
  }
`

const Quiz = ({ question, answerOptions }: QuestionAndAnswer) => {
  const [chosenAnswer, setChosenAnswer] = React.useState<AnswerOptions>({
    answer: '',
    isCorrect: false,
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
        <QuestionMark />
        <span>{question}</span>
      </QuestionTitle>
      {answerOptions.map((item, index) => (
        <AnswersWrapper key={index}>
          <Row>
            <RadioButton
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
          Submit
        </Button>
        <Button onClick={onReset}>Reset</Button>
      </ButtonsWrapper>
      {answerSubmitted ? (
        <ChosenAnswer isCorrect={chosenAnswer.isCorrect}>
          <div>{chosenAnswer.answer}</div>
        </ChosenAnswer>
      ) : null}
    </Wrapper>
  )
}

export default Quiz
