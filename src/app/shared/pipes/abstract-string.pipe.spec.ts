import { AbstractStringPipe } from './abstract-string.pipe';

describe('AbstractStringPipe', () => {
  it('create an instance', () => {
    const pipe = new AbstractStringPipe();
    expect(pipe).toBeTruthy();
  });
});
