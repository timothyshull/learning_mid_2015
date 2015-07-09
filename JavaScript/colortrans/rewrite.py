import sys
import os
import subprocess
import colortrans

f = open('list.txt', 'r+')
r = open('mylight_copy.vim', 'r+').read()
# target = open('output.txt', 'w')
# target = open('output.txt', 'w')

for line in f:
    # r = open('mylight_copy.vim', 'r+').read()
    s = colortrans.rgb2short(line)
    # r = r.replace(str('#' + s[1]).upper(), str(s[0]))
    # r = r.replace(str('#' + s[1]).lower(), str(s[0]))
    print s
    # target.write(r)
    # target.close()

# target.write(r)
    
    # print s[1].upper()
    
# out_file = open(outp, "w")
# sub = subprocess.call(['sed', 's/\"//g', inp], stdout=out_file )
#
# import sys
# import os
# import subprocess
#
# files = os.listdir(sys.argv[1])
#
# count = 0
#
# for f in files:
#     count += 1
#     inp = sys.argv[1] + f
#     outp = '../' + str(count) + '.txt'
#     sub = subprocess.call(['sed', 's/\"//g', inp, '>', outp])
#
# import os
# import sys
# files = os.listdir(sys.argv[1])
#
# for count, f in enumerate(files):
#     with open( os.path.join(sys.argv[1],f), "r" ) as source:
#         with open( os.path.join('..',str(count)+'.txt'), "w" ) as target:
#             data = source.read()
#             changed = data.replace('"','')
#             target.write( changed )