import React, { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link, useRouteMatch } from 'react-router-dom';
import Layout from '../../components/Layout';
import api from '../../services/api';

import { RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  title: string;
  id: number;
  html_url: string;
  user: {
    login: string;
  };
}

const Reposiroty: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    api.get(`/repos/${params.repository}`).then(result => {
      setRepository(result.data);
    });
    api.get(`/repos/${params.repository}/issues`).then(result => {
      setIssues(result.data);
    });
  }, [params.repository]);

  return (
    <Layout showButton>
      <RepositoryInfo>
        <header>
          <img
            src={repository?.owner.avatar_url}
            alt={repository?.owner.login}
          />
          <div>
            <strong>{repository?.full_name}</strong>
            <p>{repository?.description}</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>{repository?.stargazers_count}</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>{repository?.forks_count}</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>{repository?.open_issues_count}</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>
      <Issues>
        {issues.map(issue => (
          <a target="blank" href={issue.html_url} key={issue.id}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </Layout>
  );
};
export default Reposiroty;
