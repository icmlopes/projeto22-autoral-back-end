import { ApplicationError } from '@/protocols';

export function duplicatedCpfError(): ApplicationError {
  return {
    name: 'DuplicatedCpfError',
    message: 'Já existe um cliente cadastrado em nosso sistema com esse CPF!',
  };
}
