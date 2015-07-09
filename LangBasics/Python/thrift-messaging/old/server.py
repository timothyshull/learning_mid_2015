import sys, glob
sys.path.append('gen-py')
sys.path.insert(0, '/Users/tim_hedvig/.pyenv/versions/2.7.10/lib/python2.7/site-packages')

from RpcMsg import RpcMessage
from RpcMsg.ttypes import *

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer

class RpcMsgHandler:
  def __init__(self):
    self.log = {}

  def ping(self):
    print 'ping()'

  def clientMsg(self, msg):
    print msg.type
    print msg.data
    
    return msg

  def zip(self):
    print 'zip()'

handler = RpcMsgHandler()
processor = RpcMessage.Processor(handler)
transport = TSocket.TServerSocket(port=9090)
tfactory = TTransport.TBufferedTransportFactory()
pfactory = TBinaryProtocol.TBinaryProtocolFactory()

server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)

# You could do one of these for a multithreaded server
#server = TServer.TThreadedServer(processor, transport, tfactory, pfactory)
#server = TServer.TThreadPoolServer(processor, transport, tfactory, pfactory)

print 'Starting the server...'
server.serve()
print 'done.'