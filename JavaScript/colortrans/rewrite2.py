import sys
import os
import subprocess
import colortrans

import colortrans

f = open('list.txt', 'r+')
r = open('mylight_copy.vim', 'r+').read()
target = open('output.txt', 'w')
tups = []

for line in f:
    s = colortrans.rgb2short(line)
    t = [s[0], line.replace('\n', '')]
    tups.append(t)

for s in tups:
    # target.write('sed \'s/' + s[1] + '/' + s[0] + '/gI\' mylight.vim > output2.txt;\n')
        target.write('s/' + s[1] + '/' + s[0] + '/gI;')

target.close()