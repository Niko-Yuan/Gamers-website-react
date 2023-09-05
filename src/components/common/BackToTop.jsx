import styled from "styled-components";
import { AiOutlineArrowUp } from "react-icons/ai";

const BackToTop = () => {
  return (
    <BackToTopWrapper>
      <div className="box">
        <AiOutlineArrowUp />
      </div>
    </BackToTopWrapper>
  );
};

export default BackToTop;

const BackToTopWrapper = styled.div`
  .box {
    margin: 0;
    padding: 0;
    display: block;
    width: 50px;
    height: 50px;
  }
`;
