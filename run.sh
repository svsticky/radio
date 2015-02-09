sudo docker run -v $(pwd)/www:/var/www:rw -p 80:80 -d radio /sbin/my_init --enable-insecure-key
