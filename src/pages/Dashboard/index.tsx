import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import Layout from '../../components/Layout';
import api from '../../services/api';

import { Form, Repositories, Title, Error } from './styles';

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
  const [inputError, setInputError] = useState<string>('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );
    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    if (inputRef.current) {
      const textSearch = inputRef.current.value;

      if (!textSearch) {
        setInputError('Informe o autor/repositório');
        return;
      }

      try {
        const response = await api.get<Repository>(`repos/${textSearch}`);
        if (
          !repositories.some(repo => repo.full_name === response.data.full_name)
        ) {
          setRepositories([...repositories, response.data]);
        }
        inputRef.current.value = '';
        inputRef.current.focus();
        setInputError('');
      } catch (err) {
        setInputError('Falha ao buscar autor/repositório');
      }
    }
  }

  return (
    <Layout>
      <Title>Explore repositórios no GitHub</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input ref={inputRef} placeholder="Digite o nome do repositório" />
        <button type="submit">Buscar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link
            to={`/repository/${repository.full_name}`}
            key={repository.full_name}
          >
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
    </Layout>
  );
};
export default Dashboard;
