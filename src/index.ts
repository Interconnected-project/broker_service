import nodesServer from './nodes/nodesServer';
import EnvVariablesSingleton from './setup/EnvVariablesSingleton';

nodesServer.listen(EnvVariablesSingleton.instance.nodesPort);
console.log(
  'Nodes server started on port ' + EnvVariablesSingleton.instance.nodesPort
);
