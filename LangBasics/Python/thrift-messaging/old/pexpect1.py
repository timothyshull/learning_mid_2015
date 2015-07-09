# # The simplest intraction is a "wait until you see this, then send this" thing:
# import pexpect
# p = pexpect.spawn('ftp ftp.openbsd.org')
# p.expect ('[Nn]ame')
# p.sendline ('anonymous')
# p.expect ('[Pp]assword')
# p.sendline ('noah@example.com')
# # etc.
#
# # if you hand in a list, the return value is the index to which of the patterns matched.
# # This makes it easier to deal with errors, timeouts and, in theory, varying code paths
# p.pexpect(['ame', 'assword','[#\$]', pexpect.EOF])
# if i==0:
#     print 'sending username'
# elif i==1:
#     print 'sending password'
# elif i==2:
#     print 'looks like a prompt'
# elif i==3:
#     print 'program finished'
#

# import pexpect
# import pty,sys,os
#
# if len(sys.argv)<2:
#     print "Need a command to run"
#     sys.exit(-1)
#
# logfilename = '%s.log'%os.path.basename(sys.argv[1]) # executable name + '.log'
# if os.path.exists(logfilename):
#     print "\nRefusing to overwrite existing log %r\n\nRename or remove it and try again\n"%logfilename
#     sys.exit(-1)
#
# logfile = open(logfilename, 'wb')
#
# def read(fd):
#     data = os.read(fd, 1024)
#     logfile.write(data)
#     logfile.flush() # probably
#     return data
#
# sys.stdout.write('Writing log to %r\n'%logfilename)
# sys.stdout.flush()
#
# logfile.write('Log file for command: %r\n---------------------\n'%' '.join(sys.argv[1:]))
# pty.spawn(sys.argv[1:], read)
#
# sys.stdout.write('Done with logging %r\n'%cmd)

import subprocess
sp = subprocess.Popen(("read", "-p", "Prompt: ", "test"), stdout=subprocess.PIPE)
print sp.stdout.read()