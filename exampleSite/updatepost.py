import argparse
import os
import tempfile
import time
import local_public
import shutil

COMMIT_ONLY = False
DEPLOY_YML = 'deploy.yml'
REMOTE_PUBLIC = 'git@github.com:brangpd/blog.git'
AUTHOR = 'brangpd'
EMAIL = 'brangpd@outlook.com'

def config_git_author():
    os.system('git config --local user.name {}'.format(AUTHOR))
    os.system('git config --local user.email {}'.format(EMAIL))

parser = argparse.ArgumentParser()
parser.add_argument('-c', '--commit-only',
                    help='commit only, without publish', action='store_true')
args = parser.parse_args()

COMMIT_ONLY = args.commit_only


root = os.path.abspath(os.path.curdir)
temp = tempfile.mktemp()

with open(temp, 'w+') as f:
    os.system('git add -A')
    f.write('Changed: at {}\n\n'.format(time.ctime()))

os.system('git diff --cached --name-status content >> {}'.format(temp))
config_git_author()
os.system('git commit -F {}'.format(temp))
os.system('git push origin master')

if not COMMIT_ONLY:
    local_public_dir = local_public.get_local_public_dir()
    shutil.rmtree('{}'.format(local_public_dir), ignore_errors=True)
    os.system('hugo -d {}'.format(local_public_dir))
    workflows_dir = os.path.join(local_public_dir, '.github', 'workflows')
    os.makedirs(workflows_dir, exist_ok=True)
    shutil.copy(DEPLOY_YML, workflows_dir)
    os.chdir(local_public_dir)
    config_git_author()
    os.system('git init -b master')
    os.system('git remote add origin {}'.format(REMOTE_PUBLIC))
    os.system('git add -A')
    os.system('git commit -F "{}"'.format(temp))
    os.system('git push origin master -f')

os.remove(temp)
