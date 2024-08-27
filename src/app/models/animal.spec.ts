import { Animal } from './animal';
import { Endereco } from './endereco';
import { Userrole } from './userrole';
import { Usuario } from './usuario';

describe('Animal', () => {
  it('should create an instance', () => {
    expect(new Animal(0, "", "", "", 0, new Usuario("","","","", null, new Userrole()))).toBeTruthy();
  });
});
