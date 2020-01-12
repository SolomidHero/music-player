### Simple React.js + Python Django music player

На данный момент выполнен [deploy](http://http://34.77.191.34/login) на google cloud.

Конфигурация nginx:

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