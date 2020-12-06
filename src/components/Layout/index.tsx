import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/github-logo.svg';
import { Header } from './styles';

interface LayoutProps {
  showButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showButton }) => {
  return (
    <>
      <Header>
        <img src={logoImg} alt="logo-github" />
        {showButton && (
          <Link to="/">
            <FiChevronLeft size={16} />
            <span>Voltar</span>
          </Link>
        )}
      </Header>
      {children}
    </>
  );
};

export default Layout;
