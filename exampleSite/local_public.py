import os
import tempfile


def get_local_public_dir():
    return '{tempdir}{sep}{public}'.format(
        tempdir=tempfile.gettempdir(),
        sep=os.path.sep,
        public='hugo_local_public'
    )
