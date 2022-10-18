import User, {UnpersistedUser} from '../entities/User';

/**
 * Use cases revolving around an User.
 */
export default class UserUseCases {
  /**
   * Use case for registering an User.
   * @param {UnpersistedUser} user to persist
   * @param {function(): void} onUserAlreadyExists callback invoked when
   * the provided User already exists
   * @param {function(EncryptedToken): void} onSuccess callback invoked
   * when the registration is completed with success
   * @param {function(): void} onError callback invoked when an error
   * arises while trying to satisfy the request
   */
  register(
    user: UnpersistedUser,
    onUserAlreadyExists: () => void,
    onSuccess: () => void,
    onError: () => void,
  ): void {
    throw new Error();
  }

  /**
   * Use case for the login of an User.
   * @param {UnpersistedUser} user the User that wants to login
   * @param {function():void} onInvalidCredentials callback invoked
   * when the credentials contained in the provided User are not
   * valid to perform a login to any persisted User
   * @param {function(EncryptedToken): void} onSuccess callback
   * invoked when the login attempt is successful
   * @param {function():void} onError callback invoked when an error
   * arises duing the login attempt
   */
  login(
    user: UnpersistedUser,
    onInvalidCredentials: () => void,
    onSuccess: () => void,
    onError: () => void,
  ): void {
    throw new Error();
  }

  /**
   * Use case for retieving a persisted User by providing its ID.
   * @param {string} id the id of the User to find
   * @param {function(User):void} onFound callback invoked when the
   * User is successfully found
   * @param {function(): void} onNotFound callback invoked when no
   * User is found using the provided ID
   * @param {function(): void} onError callback invoked when an error
   * arises during the research process
   */
  getById(
    id: string,
    onFound: (user: User) => void,
    onNotFound: () => void,
    onError: () => void,
  ): void {
    throw new Error();
  }

  /**
   * Use case for retieving a persisted User by providing its username.
   * @param {string} username the username of the User to find
   * @param {function(User):void} onFound callback invoked when the
   * User is successfully found
   * @param {function(): void} onNotFound callback invoked when no
   * User is found using the provided ID
   * @param {function(): void} onError callback invoked when an error
   * arises during the research process
   */
  getByUsername(
    username: string,
    onFound: (user: User) => void,
    onNotFound: () => void,
    onError: () => void,
  ): void {
    throw new Error();
  }
}
