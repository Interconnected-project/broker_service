import server from './server';
import EnvVariablesSingleton from './setup/EnvVariablesSingleton';

server.listen(EnvVariablesSingleton.instance.port);
console.log('Server started on port ' + EnvVariablesSingleton.instance.port);
