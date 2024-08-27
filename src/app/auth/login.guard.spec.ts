import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginGuard } from './login.guard'; // Certifique-se de que o nome está correto

describe('LoginGuard', () => {
  let guard: LoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Importa módulos necessários
      providers: [LoginGuard] // Certifique-se de usar o nome correto
    });
    guard = TestBed.inject(LoginGuard); // Injeta o guardia
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
