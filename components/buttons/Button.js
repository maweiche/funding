import {motion} from 'framer-motion'
import styled from 'styled-components'

const MyButton = styled(motion.button)`
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1.5%;
  padding-left: 10px;
  padding-right: 10px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 1em;
  line-height: 35px;
  color: #b0f6ff;
  margin-top: 2%;
  background: linear-gradient(270.16deg, rgba(107, 255, 255, 0.05) 0.59%, rgba(107, 255, 255, 0) 99.41%);
  border-radius: 5px;
  width: ${(props) => props.width};
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    margin: 0;
  }
`

const Button = ({ text, onClick }) => {
  return (
    <>
      <MyButton     
        whileHover={{ scale: 0.98 }} 
        transition={{ type: "spring", stiffness: 500, damping: 3 }} 
        onClick={onClick} width={'200px'}>
        {text}
      </MyButton>
    </>
  )
}

export default Button
