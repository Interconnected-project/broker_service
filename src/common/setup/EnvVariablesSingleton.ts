import dotenv from 'dotenv';

/**
 * Singleton used to access environment variables in a type-safe way,
 * throwing error if one or more environment variables are not defined
 * or defined incorrectly.
 */
export default class EnvVariablesSingleton {
  private static inst: EnvVariablesSingleton | undefined = undefined;
  private _nodesPort: number;
  private _invokingEndpointsPort: number;

  /**
   * Private constructor, only exposing the static instance getter following
   * singleton pattern. Here the variables are initialized using private
   * handlers specific for the expected type of variable.
   * @throws if one or more environment variables are not defined
   * or defined incorrectly.
   */
  private constructor() {
    dotenv.config();
    this._nodesPort = this.getNum(process.env.NODES_PORT, 'NODES_PORT');
    this._invokingEndpointsPort = this.getNum(
      process.env.INVOKING_ENDPOINTS_PORT,
      'INVOKING_ENDPOINTS_PORT'
    );
  }

  /**
   * Executes checks on the specified numeric environment variable.
   * @param {string | undefined} v the value of the environment variable
   * @param {string} name the name to display in the error message should
   * the variable be not defined or defined incorrectly
   * @return {number} the type-safe numeric environment variable
   * @throws if v is undefined or not a number
   */
  private getNum(v: string | undefined, name: string): number {
    if (v !== undefined && !isNaN(parseInt(v))) {
      return parseInt(v);
    }
    throw Error(this.errorString(v, name));
  }

  /**
   * String that will be displayed in the error message should
   * the variable be not defined or defined incorrectly.
   * @param {string | undefined} v the value of the environment variable
   * @param {string} name the name of the variable
   * @return {string} the string created using the provided arguments
   */
  private errorString(v: string | undefined, name: string): string {
    return (
      'Something is wrong with the environment variable ' + name + ': ' + v
    );
  }

  /**
   * Static getter used to access the instance following
   * the singleton pattern.
   * @return {EnvVariablesSingleton} the singleton instance
   * @throws if one or more environment variables are not defined
   * or defined incorrectly.
   */
  static get instance(): EnvVariablesSingleton {
    if (EnvVariablesSingleton.inst === undefined) {
      EnvVariablesSingleton.inst = new EnvVariablesSingleton();
    }
    return EnvVariablesSingleton.inst;
  }

  /**
   * @return {number} the type-safe value of the NODES_PORT environment variable
   */
  get nodesPort(): number {
    return this._nodesPort;
  }

  /**
   * @return {number} the type-safe value of
   * the INVOKING_ENDPOINTS_PORT environment variable
   */
  get invokingEndpointsPort(): number {
    return this._invokingEndpointsPort;
  }
}
