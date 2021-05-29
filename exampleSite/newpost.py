import argparse
import datetime
import os
import sys
import time

EXIT_ARGUMENT_NUMBER = 1
EXIT_FILE_EXISTS = 2

tags = []
categories = []
term = 'p'
now = time.localtime()
force = False
id = 0

parser = argparse.ArgumentParser()
parser.add_argument('-g', '--gist', help='create gist', action='store_true')
parser.add_argument('-d', '--directory', help='specify directory')
parser.add_argument('title', type=str, help='the content title')
parser.add_argument('-t', '--tag', type=str, help='add a tag', action='append')
parser.add_argument('-c', '--category', type=str,
                    help='add a category', action='append')
parser.add_argument('-f', '--force', help='force replacement of existing file', type=bool)
args = parser.parse_args()

if args.force:
    force = True

if args.tag:
    tags = args.tag
if args.category:
    categories = args.category

title = args.title
if title.endswith('.md'):
    title = title[:-3]
title = title.replace(' ', '-').replace(os.path.sep, '-')

if args.gist:
    term = 'g'

if args.directory:
    directory = args.directory
    pathmd = os.path.join(directory, '{}.md'.format(title))
elif len(categories) == 1:
    category = categories[0]
    directory = os.path.join(
        'content',
        term,
        category
    )
    pathmd = os.path.join(directory, '{}.md'.format(title))
    title = category + '：' + title
else:
    directory = os.path.join(
        'content',
        term,
        str(now.tm_year),
        '{:02d}'.format(now.tm_mon))
    pathmd = os.path.join(directory, '{}.md'.format(title))

os.makedirs(directory, exist_ok=True)
if not force and os.path.exists(pathmd):
    print('{} already exists.'.format(pathmd))
    exit(EXIT_FILE_EXISTS)

dt = time.strftime('%Y-%m-%dT%H:%M:%S%z', now)

with open('postnum', 'r+') as f:
    id = int(f.readline())
    f.seek(os.SEEK_SET)
    f.write(str(id + 1))

template = '''---
id: {}
aliases: ["/pid/{}"]
title: {}
description:
date: {}
draft:
tags: {}
categories: {}
closecomment: false
licence:
---
'''.format(id, id, title, dt, tags, categories)
print(os.path.abspath(pathmd))
with open(pathmd, 'w+') as f:
    f.write(template)
