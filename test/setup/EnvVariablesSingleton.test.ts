import { TEST_PORT_VARIABLE } from '../utils/set_env_variables';
import EnvVariablesSingleton from '../../src/setup/EnvVariablesSingleton';

test('It should return the correct environment variables', () => {
  const singleton = EnvVariablesSingleton.instance;
  expect(singleton.port).toEqual(TEST_PORT_VARIABLE);
});
