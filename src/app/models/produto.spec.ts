import { Produto } from './produto';

describe('Produto', () => {
  it('should create an instance', () => {
    expect(new Produto(0, "", 0, 0, true, "")).toBeTruthy();
  });
});
