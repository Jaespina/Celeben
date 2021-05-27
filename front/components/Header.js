import styled from 'styled-components';
import Link from 'next/link';
import Cart from './Cart';
import Nav from './Nav';
import Search from './Search';

const Logo = styled.h1`
  background: orange;
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid blue;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-space-between;
    align-items: stretch;
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
  }
`;

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">Celeben</Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
      <Search />
      </div>
      <Cart />
    </HeaderStyles>
  );
}
