import { Endereco } from './endereco';

describe('Endereco', () => {
  it('should create an instance', () => {
    expect(new Endereco("", 0)).toBeTruthy();
  });
});
