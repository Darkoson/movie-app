import React, { FC, ReactElement } from "react";
import styled from "styled-components";

interface ModalProps {
    page: ReactElement;
    onComplete?: (data: any) => void;
    onClose?: (data: any) => void;
    
} 
const Modal: FC<ModalProps> = (props) => {
  return (
    <Container>
          <h1> index of movies</h1>
          <div className="page">
              {props.page}
          </div>
    </Container>
  );
};

const Container = styled.div``;

export default Modal;
