import { ApplicationError } from '@/protocols';

export function duplicatedEmailError(): ApplicationError {
  return {
    name: 'DuplicatedEmailError',
    message: 'Esse e-mail já possui uma conta em nosso sistema!',
  };
}
