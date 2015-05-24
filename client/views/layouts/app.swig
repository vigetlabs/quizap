<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>¡Quizap!</title>
    <meta name="apple-mobile-web-app-status-bar-style" content="transparent">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="Graba">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" href="/assets/css/app.css">
  </head>
  <body>
    {% block content %}{% endblock %}
    <script src="/socket.io/socket.io.js"></script>
    <script src="/assets/js/app.js"></script>
  </body>
</html>
