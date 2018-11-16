process.argv.push('--silent');

import { expect } from 'chai';
import { getBrowser, Iro } from './index';

describe('Iro', () => {
  describe('SILENT', () => {
    it('should return true if --silent flag is provided', () => {
      expect((Iro as any).SILENT).to.equal(true);
    });
  });

  describe('log', () => {
    it('should return Iro', () => {
      expect(Iro.log('')).to.equal(Iro);
      expect(Iro.log({})).to.equal(Iro);
    });
  });

  describe('success', () => {
    it('should return Iro', () => {
      expect(Iro.success('')).to.equal(Iro);
      (Iro as any).SILENT = true;
      expect(Iro.success('')).to.equal(Iro);
      (Iro as any).SILENT = false;
    });
  });

  describe('warn', () => {
    it('should return Iro', () => {
      expect(Iro.warn('')).to.equal(Iro);
      (Iro as any).SILENT = true;
      expect(Iro.warn('')).to.equal(Iro);
      (Iro as any).SILENT = false;
    });
  });

  describe('error', () => {
    it('should return Iro', () => {
      expect(Iro.error('')).to.equal(Iro);
      (Iro as any).SILENT = true;
      expect(Iro.error('')).to.equal(Iro);
      (Iro as any).SILENT = false;
    });
  });

  describe('info', () => {
    it('should return Iro', () => {
      expect(Iro.info('')).to.equal(Iro);
    });
  });

  describe('describe', () => {
    it('should return Iro', () => {
      expect(Iro.describe('')).to.equal(Iro);
    });
  });

  describe('red', () => {
    it('should apply red colour for Node.js console', () => {
      expect(Iro.red('hello')).to.equal('\u001b[31mhello\u001b[0m');
    });
  });

  describe('green', () => {
    it('should apply green colour for Node.js console', () => {
      expect(Iro.green('hello')).to.equal('\u001b[32mhello\u001b[0m');
    });
  });

  describe('gray', () => {
    it('should apply gray colour for Node.js console', () => {
      expect(Iro.gray('hello')).to.equal('\u001b[30mhello\u001b[0m');
    });
  });

  describe('yellow', () => {
    it('should apply yellow colour for Node.js console', () => {
      expect(Iro.yellow('hello')).to.equal('\u001b[33mhello\u001b[0m');
    });
  });

  describe('blue', () => {
    it('should apply blue colour for Node.js console', () => {
      expect(Iro.blue('hello')).to.equal('\u001b[34mhello\u001b[0m');
    });
  });

  describe('magenta', () => {
    it('should apply magenta colour for Node.js console', () => {
      expect(Iro.magenta('hello')).to.equal('\u001b[35mhello\u001b[0m');
    });
  });

  describe('cyan', () => {
    it('should apply cyan colour for Node.js console', () => {
      expect(Iro.cyan('hello')).to.equal('\u001b[36mhello\u001b[0m');
    });
  });

  describe('white', () => {
    it('should apply white colour for Node.js console', () => {
      expect(Iro.white('hello')).to.equal('\u001b[37mhello\u001b[0m');
    });
  });

  describe('bold', () => {
    it('should apply bold colour for Node.js console', () => {
      expect(Iro.bold('hello')).to.equal('\u001b[1mhello\u001b[0m');
    });
  });

  describe('underline', () => {
    it('should apply underline colour for Node.js console', () => {
      expect(Iro.underline('hello')).to.equal('\u001b[4mhello\u001b[0m');
    });
  });

  describe('inverse', () => {
    it('should apply inverse colour for Node.js console', () => {
      expect(Iro.inverse('hello')).to.equal('\u001b[7mhello\u001b[0m');
    });
  });

  describe('breaks', () => {
    it('should return Iro', () => {
      expect(Iro.breaks()).to.equal(Iro);
      expect(Iro.breaks(2)).to.equal(Iro);
      expect(Iro.breaks(-1)).to.equal(Iro);
    });
  });

  describe('spaces', () => {
    it('should return one space if argument was not provided', () => {
      expect(Iro.space()).to.equal(' ');
    });

    it('should return given amount of spaces', () => {
      expect(Iro.space(3)).to.equal('   ');
    });

    it('should return one space if given argument is negative', () => {
      expect(Iro.space(-1)).to.equal(' ');
    });
  });

  describe('getBrowser', () => {
    it('should return nothing in Node.js environment', () => {
      expect(getBrowser()).to.equal(undefined);
    });
  });
});
