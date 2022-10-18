import server from './server';
import EnvVariablesSingleton from './setup/EnvVariablesSingleton';

const envVariables = EnvVariablesSingleton.instance;

server.listen(envVariables.port, () => {
  console.log('Server is listening on port ' + envVariables.port);
});
