import sys, glob, subprocess
sys.path.append('gen-py')
sys.path.insert(0, '/Users/tim_hedvig/.pyenv/versions/2.7.10/lib/python2.7/site-packages')

from RpcMsg import RpcMessage
from RpcMsg.ttypes import *

from thrift import Thrift
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer


try:

  # Make socket
  transport = TSocket.TSocket('localhost', 9091)

  # Buffering is critical. Raw sockets are very slow
  transport = TTransport.TBufferedTransport(transport)

  # Wrap in a protocol
  protocol = TBinaryProtocol.TBinaryProtocol(transport)

  # Create a client to use the protocol encoder
  client = RpcMessage.Client(protocol)

  # Connect!
  transport.open()

  client.ping()
  print 'ping()'
  
  msg = Message()
  msg.type = "cmd"
  msg.data = "pwd"
  # print msg.type
  # print msg.data

  client.clientMsg(msg)

  # Close!
  transport.close()

except Thrift.TException, tx:
  print '%s' % (tx.message)
  

class RpcMsgHandler:
  def __init__(self, clnt):
    self.log = {}
    self.clnt = clnt

  def ping(self):
    print 'ping()'

  def clientMsg(self, msg):
    # print msg.type
    # print msg.data
    cmd = msg.data.split()
    sp = subprocess.Popen((cmd[0], cmd[1], cmd[2], cmd[3]), stdout=subprocess.PIPE)
    print "Output here: "
    ouput = sp.stdout.read()
    print "Output here: " + output
    # newMsg = Message()
#     newMsg.type = "res"
#     newMsg.data = output
#     print newMsg
#     self.clnt.clientMsg(newMsg)
    
    return msg

  def zip(self):
    print 'zip()'

handler = RpcMsgHandler(client)
processor = RpcMessage.Processor(handler)
# transport = TSocket.TServerSocket(port=9090)
transport = TSocket.TServerSocket(unix_socket='/tmp/thrift.sock')
tfactory = TTransport.TBufferedTransportFactory()
pfactory = TBinaryProtocol.TBinaryProtocolFactory()

server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)

# You could do one of these for a multithreaded server
#server = TServer.TThreadedServer(processor, transport, tfactory, pfactory)
#server = TServer.TThreadPoolServer(processor, transport, tfactory, pfactory)

print 'Starting the server...'
server.serve()
print 'done.'

# import pty;
#
# pty.spawn('/bin/sh')