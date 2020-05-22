# Simple React.js + Django music player

Music player site with basic functionality, such as sign up, login, player. Implemented using `django` backend and `react.js` frontend.
You can check the deployed app [here](http://34.77.191.34/). 

This project already have some initial users in database to play with.

# Installation

## Dependencies

First you need common tools:

- `pip` - packet manager for `python3` which is used by django
- `node.js` - used by many web projects (and frontend here)
- `yarn` (or `npm`) - packet manager for `node.js`

Install them by simple commands:

**MacOS**
```zsh
brew install python3 node yarn
# also installs pip
```
**Linux**
```bash
sudo apt update
sudo apt install python3-pip
sudo apt install nodejs
sudo apt install yarn
```

**Django dependencies** described in `django_server/requirements.txt`.
Install them via pip
(this step is recommended inside the [python virtual environment](https://docs.python.org/3/tutorial/venv.html)):
```bash
pip install -r ./django_server/requirements.txt
# installs required django, djangorestframework-jwt, uWSGI, django-cors-headers
```

**Frontend dependencies** described in `frontend/package.json`.
Install them via yarn (or npm):
```bash
cd frontend
yarn install
# installs required bootstrap, react, redux
```

## Development mode

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

## Production mode (for linux server)

You need to obtain the IP or FQDN for the machine in order to get external endpoints. Better follow this [tutorial of nginx installation](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)

Install and run nginx:
```bash
sudo apt install nginx
sudo systemctl start nginx
```

Modify `./django_server/uwsgi.ini` file with project absolute path:
**`./django_server/uwsgi.ini`**
```conf
... # for example "/home/username/music-player/django_server"
chdir={PROJECT_PATH}/music-player/django_server
wsgi-file={PROJECT_PATH}/django_server/django_server/wsgi.py
...
```

At this point we need to tell `nginx` which `uwsgi_params` should be used.
To do this `nginx.conf` file must be modified (you can read more about nginx + uwsgi + django installation [here](https://uwsgi-docs.readthedocs.io/en/latest/tutorials/Django_and_nginx.html)).

**`/etc/nginx/conf.d/music_player.conf`**
```conf
upstream django {
  server unix:///var/run/music_player_app.sock; # for a file socket
}

# configuration of the server
server {
  # the port your site will be served on
  listen      80;
  # the domain name it will serve for
  server_name {SERVER_EXTERNAL_IP}; # substitute with your machine's IP address or FQDN, for example example.com
  charset     utf-8;

  # max upload size
  client_max_body_size 75M;   # adjust to tastes

  location /static {
    alias {PROJECT_PATH}/music-player/django_server/static; # your Django project's static files - amend as required
  }

  # Finally, send all non-media requests to the Django server.
  location / {
    uwsgi_pass  django;
    include     {PROJECT_PATH}/django_server/uwsgi_params; # the uwsgi_params file you installed
  }
}
```

Also you can modify `./music_player.conf` and move it to nginx configurations:
```bash
vim ./music_player.conf # modify .conf file as shown below
sudo mv ./music_player.conf /etc/nginx/conf.d/music_player.conf
```

Finally restart the nginx:
```bash
sudo systemctl restart ngincx
```

At this you can obtain the website through visiting your external IP

To stop using nginx follow:
```bash
sudo systemctl stop nginx
```