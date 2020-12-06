import React, { FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/github-logo.svg';

import { Form, Repositories, Title } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    if (inputRef.current) {
      const textSearch = inputRef.current.value;
      const response = await api.get<Repository>(`repos/${textSearch}`);
      if (
        !repositories.some(repo => repo.full_name === response.data.full_name)
      ) {
        setRepositories([...repositories, response.data]);
      }
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }

  return (
    <>
      <img src={logoImg} alt="logo-github" />
      <Title>Explore repositórios no GitHub</Title>

      <Form onSubmit={handleAddRepository}>
        <input ref={inputRef} placeholder="Digite o nome do repositório" />
        <button type="submit">Buscar</button>
      </Form>

      <Repositories>
        {repositories.map(repository => (
          <Link to="/repository" key={repository.full_name}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />

            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};
export default Dashboard;
