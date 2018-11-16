import { inspect } from 'util';

const isNode = typeof process !== 'undefined' && !!process.versions && !!process.versions.node;
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

/**
 * Decoration enum representing ASCII symbols for applying given colours. Only used in Node.js.
 */
export enum DecorationEnum {
  gray = '\x1b[30m',
  red = '\x1b[31m',
  green = '\x1b[32m',
  yellow = '\x1b[33m',
  blue = '\x1b[34m',
  magenta = '\x1b[35m',
  cyan = '\x1b[36m',
  white = '\x1b[37m',
  bold = '\x1b[1m',
  underline = '\x1b[4m',
  inverse = '\x1b[7m',
}

/**
 * @interface IBrowserInfo
 */
interface IBrowserInfo {
  /**
   * Name of the browser currently being used.
   */
  name: string;
  /**
   * Version of the browser currently being used.
   */
  version: string;
}

/**
 * Get information about the browser currently being used. Only used in browsers.
 * Taken from StackOverflow comment by Brandon on https://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
 */
export const getBrowser = (): IBrowserInfo => {
  if (!isBrowser) {
    return;
  }

  const ua: string = navigator.userAgent;
  let tem: string[],
    M: string[] = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: 'IE', version: tem[1] || '' };
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (tem != null) return { name: tem[1].replace('OPR', 'Opera'), version: tem[2] };
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
  return { name: M[0], version: M[1] };
};

/**
 * Iro allows applying colours to the console output. It provides simple interfaces usable both in Node.js and
 * browsers (Google Chrome and Mozilla Firefox 31+ are supported).
 * @class Iro
 * @abstract
 */
export abstract class Iro {
  /**
   * Write blank lines to the console. If argument is not provided, one blank line will be put
   * @param lines Amount of blank lines to be written to console
   * @static
   */
  public static breaks(lines: number = 1): typeof Iro {
    lines = lines < 1 ? 1 : lines;

    while (lines) {
      Iro.writeNode('\n');
      lines--;
    }

    return Iro;
  }

  /**
   * Write spaces to the console. If argument is not provided, one space will be put.
   * @param spaces Amount of spaces to be written to console
   * @static
   */
  public static space(spaces: number = 1): string {
    spaces = spaces < 1 ? 1 : spaces;
    return ' '.repeat(spaces);
  }

  /**
   * Entry point for writing to console with the default colour. This method uses `process.stdout` for Node.js.
   * @param message
   * @static
   */
  public static log(...message: any[]): typeof Iro {
    return Iro.writeNode(...message).breaks();
  }

  /**
   * Entry point for writing to console with the red colour. This method uses `process.stderr` for Node.js.
   * @param message
   * @static
   */
  public static error(...message: any[]): typeof Iro {
    if (Iro.SILENT) {
      return Iro;
    }

    process.stderr.write(`${message.join('')}\n`);
    return Iro;
  }

  /**
   * Entry point for writing to console with the yellow colour. This method uses `process.stdout` for Node.js.
   * @param message
   * @static
   */
  public static warn(...message: any[]): typeof Iro {
    return Iro.writeNode(Iro.yellow(...message)).breaks();
  }

  /**
   * Entry point for writing to console with the green colour. This method uses `process.stdout` for Node.js.
   * @param message
   * @static
   */
  public static success(...message: any[]): typeof Iro {
    return Iro.writeNode(Iro.green(...message)).breaks();
  }

  /**
   * Entry point for writing to console with the blue colour. This method uses `process.stdout` for Node.js.
   * @param message
   * @static
   */
  public static info(...message: any[]): typeof Iro {
    return Iro.writeNode(Iro.blue(...message)).breaks();
  }

  /**
   * Alias to `Iro.log`. Deprecated. Added for backwards compatibility with `@totemish/shell`.
   * @alias log
   * @deprecated
   * @static
   */
  public static describe = (...x: any[]): typeof Iro => {
    Iro.warn('"Shell.describe" is deprecated and will be removed in future releases. Please, use "Iro.log" instead.');
    return Iro.log(...x);
  }

  /**
   * Alias to `Iro.log`. Deprecated. Added for backwards compatibility with `@totemish/shell`.
   * @alias log
   * @deprecated
   * @static
   */
  public static write = (...x: any[]): typeof Iro => {
    Iro.warn('"Shell.write" is deprecated and will be removed in future releases. Please, use "Shell.log" instead.');
    return Iro.log(...x);
  }

  /**
   * Apply red colour to provided message(s). If the message already has decoration applied,
   * it will not be overridden.
   * @param message
   * @static
   */
  public static red(...message: any[]): string {
    return message.map((x) => Iro.decorateNode(x, 'red')).join('');
  }

  /**
   * Apply green colour to provided message(s). If the message already has decoration applied,
   * it will not be overridden.
   * @param message
   * @static
   */
  public static green(...message: any[]): string {
    return message.map((x) => Iro.decorateNode(x, 'green')).join('');
  }

  /**
   * Apply yellow colour to provided message(s). If the message already has decoration applied,
   * it will not be overridden.
   * @param message
   * @static
   */
  public static yellow(...message: any[]): string {
    return message.map((x) => Iro.decorateNode(x, 'yellow')).join('');
  }

  /**
   * Apply blue colour to provided message(s). If the message already has decoration applied,
   * it will not be overridden.
   * @param message
   * @static
   */
  public static blue(...message: any[]): string {
    return message.map((x) => Iro.decorateNode(x, 'blue')).join('');
  }

  /**
   * Apply cyan colour to provided message(s). If the message already has decoration applied,
   * it will not be overridden.
   * @param message
   * @static
   */
  public static cyan(...message: any[]): string {
    return message.map((x) => Iro.decorateNode(x, 'cyan')).join('');
  }

  /**
   * Apply magenta colour to provided message(s). If the message already has decoration applied,
   * it will not be overridden.
   * @param message
   * @static
   */
  public static magenta(...message: any[]): string {
    return message.map((x) => Iro.decorateNode(x, 'magenta')).join('');
  }

  /**
   * Apply white colour to provided message(s). If the message already has decoration applied,
   * it will not be overridden.
   * @param message
   * @static
   */
  public static white(...message: any[]): string {
    return message.map((x) => Iro.decorateNode(x, 'white')).join('');
  }

  /**
   * Apply gray colour to provided message(s). If the message already has decoration applied,
   * it will not be overridden.
   * @param message
   * @static
   */
  public static gray(...message: any[]): string {
    return message.map((x) => Iro.decorateNode(x, 'gray')).join('');
  }

  /**
   * Apply bold decoration to provided message(s). This is compatible with other text decorations.
   * @param message
   * @static
   */
  public static bold(...message: any[]): string {
    return message.map((x) => Iro.decorateNode(x, 'bold')).join('');
  }

  /**
   * Apply underline decoration to provided message(s). This is compatible with other text decorations.
   * @param message
   * @static
   */
  public static underline(...message: any[]): string {
    return message.map((x) => Iro.decorateNode(x, 'underline')).join('');
  }

  /**
   * Apply inverse decoration to provided message(s), setting the text colour to the terminal default colour and the
   * background colour to the colour specified or terminal default text colour. This is compatible with other
   * text decorations.
   * @param message
   * @static
   */
  public static inverse(...message: any[]): string {
    return message.map((x) => Iro.decorateNode(x, 'inverse')).join('');
  }

  /**
   * EOL for closing scope of decorated message in Node.js console.
   * @static
   */
  private static ASCII_EOL: string = '\x1b[0m';

  /**
   * Browser-specific information.
   * @static
   */
  private static BROWSER?: IBrowserInfo = isBrowser ? getBrowser() : undefined;

  /**
   * Check for a restriction on using ASCII symbols in Node.js console. This will set Iro up to provide message
   * to the output with default colors. To restrict applying ASCII, provide a `--no-ascii` or `--no-color` flag.
   * @static
   */
  private static NO_ASCII: boolean =
    isNode && (process.argv.includes('--no-ascii') || process.argv.includes('--no-color'));

  /**
   * Check for capability of current browser to support coloured output in console (Google Chrome and
   * Mozilla Firefox 31+).
   * @static
   */
  private static COMPATIBLE_BROWSER: boolean =
    isBrowser &&
    (Iro.BROWSER.name === 'Chrome' ||
      (Iro.BROWSER.name === 'Firefox' && Number.parseInt(Iro.BROWSER.version, 10) >= 31));

  /**
   * Check for restriction to use decoration in the output.
   * @static
   */
  private static NO_COLOR: boolean = isNode ? Iro.NO_ASCII : !Iro.COMPATIBLE_BROWSER;

  /**
   * Check for restriction on providing output to console. This only works for Node.js. This will set Iro up to
   * provide no output at all. To restrict output, provide a `--silent` flag.
   */
  private static SILENT: boolean = isNode ? process.argv.includes('--silent') : false;

  /**
   * Glue message if necessary and send it to Node.js `process.stdout`.
   * @static
   * @param message
   */
  private static writeNode(...message: any[]): typeof Iro {
    if (Iro.SILENT) {
      return Iro;
    }

    process.stdout.write(message.join(''));
    return Iro;
  }

  /**
   * Apply decoration to given data. Inspect object before applying decoration if this is a Node.js console.
   * @static
   */
  private static decorateNode(data: any, decoration: keyof typeof DecorationEnum): string {
    data = typeof data === 'object' && isNode ? inspect(data) : data;
    return Iro.NO_COLOR ? `${data}` : `${DecorationEnum[decoration]}${data}${Iro.ASCII_EOL}`;
  }
}

/**
 * Alias for Iro. Deprecated. Added for backwards compatibility with `@totemish/shell`.
 * @alias
 * @deprecated
 */
export const Shell = Iro;

/**
 * Contents of Iro exported separately for easier access.
 */
export const {
  log,
  warn,
  error,
  info,
  success,
  space,
  breaks,
  blue,
  yellow,
  white,
  cyan,
  gray,
  green,
  bold,
  describe,
  inverse,
  magenta,
  red,
  underline,
} = Iro;
