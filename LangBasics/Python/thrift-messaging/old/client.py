import sys, glob
sys.path.append('gen-py')
sys.path.insert(0, '/Users/tim_hedvig/.pyenv/versions/2.7.10/lib/python2.7/site-packages')

from RpcMsg import RpcMessage
from RpcMsg.ttypes import *

from thrift import Thrift
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol

try:

  # Make socket
  transport = TSocket.TSocket('localhost', 9090)

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
  print msg.type
  print msg.data

  client.clientMsg(msg)

  # Close!
  transport.close()

except Thrift.TException, tx:
  print '%s' % (tx.message)
