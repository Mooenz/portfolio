import styled from 'styled-components';
import Theme from '../../constant/uiTheme';

const { white, redCherry, redCherryLight, blackIntense } = Theme;

export const Nav = styled.section`
  background: ${blackIntense};
  position: fixed;
  z-index: 1;
  width: 100%;
  padding: 16px;
`;

export const Container = styled.nav`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  margin: auto;

  @media screen and (min-width: 1220px) {
    width: 1200px;
  }
`;

export const Logo = styled.a`
  font-size: 2.2rem;
  font-weight: 800;
  transition-duration: 0.5s;

  &:hover {
    color: ${redCherry};
  }
`;

export const Bar = styled.div`
  height: 4px;
  width: 100%;
  background-color: ${white};
  transition: 0.5s;
  ${({ transformOne }) =>
    transformOne && 'transform: rotate(-45deg) translate(-8px, 6px)'};
  ${({ opacityBar }) => opacityBar && 'opacity:0'};

  ${({ transformTwo }) =>
    transformTwo && 'transform: rotate(45deg) translate(-8px, -8px)'};
`;

export const Burger = styled.div`
  height: 25px;
  width: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  z-index: 1;

  &:hover ${Bar} {
    background-color: ${redCherry};
  }

  @media screen and (min-width: 790px) {
    display: none;
  }
`;

export const Links = styled.ul`
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(10px);
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 30px;
  list-style: none;
  display: ${({ showIcon }) => (showIcon ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  text-align: center;
  padding: 24px;
  position: absolute;
  font-weight: 700;
  height: 100vh;
  left: 0;
  right: 0;
  top: 0;
  font-size: 4rem;

  @media screen and (min-width: 790px) {
    display: flex;
    flex-direction: row;
    position: initial;
    align-items: center;
    gap: 0;
    padding: 0;
    font-size: 1.6rem;
    background: none;
    backdrop-filter: none;
    box-shadow: none;
    height: 100%;
  }
`;

export const Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 5px;
    width: 100%;
    transform: ${({ activeTap, tapTitle }) =>
      activeTap === tapTitle ? 'translateX(0)' : 'translateX(-110%)'};
    background-color: ${redCherry};
    transition: all 0.5s;

    @media screen and (min-width: 790px) {
      height: 2px;
    }
  }

  &:hover {
    a {
      color: ${({ activeTap, tapTitle }) =>
        activeTap === tapTitle ? redCherry : redCherryLight};
    }

    &::after {
      background-color: ${({ activeTap, tapTitle }) =>
        activeTap === tapTitle ? redCherry : redCherryLight};
      transform: translateX(0);
    }
  }

  &:nth-child(3)::after {
    display: none;
  }

  @media screen and (min-width: 375px) {
    max-width: 330px;
  }

  @media screen and (min-width: 790px) {
    height: 100%;
  }
`;

export const Tap = styled.a`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 16px 30px;
  transition: color 0.5s;
  color: ${({ activeTap, tapTitle }) => activeTap === tapTitle && redCherry};

  &:hover {
    color: ${redCherry};
  }
`;

export const Button = styled.button`
  position: relative;
  display: inline-block;
  padding: 8px 24px;
  margin: 0 16px 0 30px;
  border: 2px solid ${redCherry};
  border-radius: 10px;
  background-color: transparent;
  text-decoration: none;
  color: ${redCherry};
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  transition-duration: 0.5s;
  cursor: pointer;
  overflow: hidden;

  @media screen and (min-width: 790px) {
    font-size: 1.6rem;
    padding: 8px 16px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${redCherry};
    z-index: -1;
    transform: translateX(-110%);
    transition: all 0.5s;
  }

  &:hover::before {
    transform: translateX(0);
  }

  &:hover {
    color: ${white};
  }
`;

export const DownloadICon = styled.span``;
