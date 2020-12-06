import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link, useRouteMatch } from 'react-router-dom';
import Layout from '../../components/Layout';

import { RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

const Reposiroty: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  return (
    <Layout showButton>
      <RepositoryInfo>
        <header>
          <img
            src="https://avatars1.githubusercontent.com/u/12186257?v=4"
            alt="Otoniel github"
          />
          <div>
            <strong>Otoniel Duarte</strong>
            <p>Description</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>120</strong>
            <span>Issues</span>
          </li>
        </ul>
      </RepositoryInfo>
      <Issues>
        <Link to="asdasd">
          <div>
            <strong>asdasdasd</strong>
            <p>asdasdasd</p>
          </div>

          <FiChevronRight size={20} />
        </Link>
      </Issues>
    </Layout>
  );
};
export default Reposiroty;
