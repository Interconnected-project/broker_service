export type RecruitmentRequestPayload = {
  invokingEndpointId: string;
  requirements: {
    role: string;
  };
};

export type RecruitmentBroadcastPayload = {
  invokingEndpointId: string;
  roomId: string;
  requirements: {
    role: string;
  };
};

export function requestToBroadcast(
  r: RecruitmentRequestPayload,
  roomId: string
): RecruitmentBroadcastPayload {
  return {
    invokingEndpointId: r.invokingEndpointId,
    roomId: roomId,
    requirements: {
      role: r.requirements.role,
    },
  };
}
