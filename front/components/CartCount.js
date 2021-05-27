import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

const Dot = styled.div`
  background-color: var(--red);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
`;

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: transform 0.2s;
    backface-visibility: hidden;
  }
  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }
  .counter-enter-active {
    transform: rotateX(0);
  }
  .counter-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .counter-exit-active {
    transform: scale(4) rotateX(0.5turn);
  }
`;

export default function CartCount({ count }) {
  return (
    <AnimationStyles>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          className="count"
          classNames="count"
          key={count}
          timeout={{ enter: 200, exit: 200 }}
        >
          <Dot>{count}</Dot>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  );
}
