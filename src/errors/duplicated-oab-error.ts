import { ApplicationError } from '@/protocols';

export function duplicatedOabError(): ApplicationError {
  return {
    name: 'DuplicatedOabError',
    message: 'Essa OAB já está cadastrada uma conta em nosso sistema!',
  };
}
