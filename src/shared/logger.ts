class Logger {
  private readonly _prefix = '[st-editor]';

  getMessage(message: string): string {
    return `${this._prefix} ${message}`;
  }

  throwError(error: string): void {
    throw new Error(`${this._prefix} ${error}`);
  }
}

export const logger = new Logger();
