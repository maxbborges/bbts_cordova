- criar maquina docker

        $ git clone https://gitlab.com/maxbborges/projetosdocker

- Entrar na pasta clonada e na pasta do projeto

        $ docker image build -t NOME_IMAGEM .
        $ docker run -d -P -p 80:80 -p 8000:8000 -p 90:90 -p 3001:3001 -p 22:22 -v "$PWD/bbts/:/home/user/backup" --name bbts bbts
        $ docker exec -it -u user bbts bin/bash
        
- Acesar a pasta do usuário

        $ git clone https://gitlab.com/maxbborges/bbts.git
        $ cd bbts/app
        $ npm install
        $ cordova platforms add browser
        $ cordova run browser
        ou
        $ cordova run --live-reload
        
- Configurar MYSQL
        
        $ sudo mysql
 
        CREATE USER 'user'@'%' IDENTIFIED BY '123456';
        GRANT ALL PRIVILEGES ON * . * TO 'user'@'%';
        FLUSH PRIVILEGES;
        exit

- Acessar a pasta gingacana_mctic
    - Popular o banco
        
        $ mysql -u user -p123456 ----TABELA----- < ----ARQUIVO.SQL----

        $ mysql -p123456
        

- Configurar APACHE2

        $ sudo nano /etc/apache2/sites-enabled/000-default.conf

        DocumentRoot /home/user/bbts/server
            
        <Directory /home/user/bbts/server>
            AllowOverride none 
            Require all granted
        </Directory>
        
        $ sudo service apache2 restart
