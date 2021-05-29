import os
import sys
import local_public

cmd = 'hugo server -b http://127.0.0.1:1313 -d "{}"'.format(
    local_public.get_local_public_dir())
if len(sys.argv) > 1:
    for arg in sys.argv:
        cmd += ' '
        cmd += arg
os.system(cmd)
