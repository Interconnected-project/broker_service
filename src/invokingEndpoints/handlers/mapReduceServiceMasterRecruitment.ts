import { Socket } from 'socket.io';
import Connection from '../../common/Connection';
import NodesSocketServerSingleton from '../../nodes/NodesSocketServerSingleton';

import { RECRUITMENT } from '../../nodes/const/channels';
import { DESKTOP } from '../../nodes/const/deviceTypes';
import { MAPREDUCE_MASTER } from '../../nodes/const/roles';
import { MAPREDUCE_SERVICE_MASTER_RECRUITMENT } from '../const/channels';
import { logInvokingEndpoints as log } from '../../common/util/log';

export default function mapReduceServiceMasterRecruitment(
  socket: Socket,
  connection: Connection
) {
  socket.on(MAPREDUCE_SERVICE_MASTER_RECRUITMENT, function () {
    log('MapReduce Service Master recruitment request (' + connection.id + ')');
    NodesSocketServerSingleton.server.broadcastMsg(RECRUITMENT, {
      role: MAPREDUCE_MASTER,
      deviceType: DESKTOP,
    });
  });
}
