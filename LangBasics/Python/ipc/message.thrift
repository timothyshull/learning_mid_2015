# message.thrift for ipc communication
namespace js ipcServer
namespace py ipcServer

struct Message {
    1: string msg,
    2: string data
}