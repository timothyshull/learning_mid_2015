namespace js RpcMsg
namespace py RpcMsg

struct Message {
  1: required string type,
  2: required string data
}

exception PtyUnavailable {
    1: string error;
}

service RpcMessage {
    void ping(),
    bool clientMsg(1:Message msg) throws (1:PtyUnavailable unavailable),
    bool srvrMsg(1:Message msg) throws (1:PtyUnavailable unavailable),
    oneway void zip()
}