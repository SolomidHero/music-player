# Simple React.js + Python Django music player

Music player site with basic functionality, such as sign up, login, player. Implemented using `django` backend and `react.js` frontend.
You can check the deployed app [here](http://34.77.191.34/).

## Installation

### Dependencies

First you need common tools:

- `pip` - packet manager for `python3` which is used by django
- `node.js` - used by many web projects (and frontend here)
- `yarn` (or `npm`) - packet manager for `node.js`

Install them by simple commands:

**MacOS**
```zsh
$ brew install python3 node yarn
# also installs pip
```
**Linux**
```bash
$ sudo apt update
$ sudo apt install python3-pip
$ sudo apt install nodejs
$ sudo apt install yarn
```

**Django dependencies** described in `django_server/requirements.txt`.
Install them via pip
(this step is recommended inside the [python virtual environment](https://docs.python.org/3/tutorial/venv.html)):
```bash
$ pip install -r ./django_server/requirements.txt
# installs required django, djangorestframework-jwt, uWSGI, django-cors-headers
```

**Frontend dependencies** described in `frontend/package.json`.
Install them via yarn (or npm):
```bash
$ cd frontend
$ yarn install
# installs required bootstrap, react, redux
```

### Development mode

Set the appropriate flags for development:

**`./django_server/django_server/settings.py`**
```python
...
DEBUG = True
...
```

Run backend and frontend servers separately:
```bash
python ./django_server/manage.py runserver
# runs django server (backend)
```
```bash
cd ./frontend
yarn start
# runs react app server (frontend)
```

### Production mode (for linux server)

nginx configuration:

**`/etc/nginx/conf.d/music_player.conf`**
```
upstream django {
  server unix:///var/run/music_player_app.sock; # for a file socket
}

# configuration of the server
server {
  # the port your site will be served on
  listen      80;
  # the domain name it will serve for
  server_name {SERVER_EXTERNAL_IP}; # substitute your machine's IP address or FQDN
  charset     utf-8;

  # max upload size
  client_max_body_size 75M;   # adjust to taste

  location /static {
    alias /path/to/repo/music-player/django_server/static; # your Django project's static files - amend as required
  }

  # Finally, send all non-media requests to the Django server.
  location / {
    uwsgi_pass  django;
    include     /path/to/repo/django_server/uwsgi_params; # the uwsgi_params file you installed
  }
}
```

