# Intrucciones

## 1-Primero clonar el repositorio
git clone https://github.com/userAndres99/Framework.git

## 2-Copiar archivo de entorno y generar la clave de la app
cp .env.example .env
php artisan key:generate

## 3-Editar .env con la conexión a la base de datos MySQL (ejemplo XAMPP)

### para conectarse a mysql
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_de_tu_base
DB_USERNAME=root
DB_PASSWORD=

### para conectarse a brevo que es el encargado de los mails
MAIL_MAILER=smtp
MAIL_HOST=smtp-relay.brevo.com
MAIL_PORT=587
MAIL_USERNAME=97e4a1001@smtp-brevo.com
MAIL_PASSWORD=hBCf4Zab9zA0Pq5w
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=huellassolidarias.contacto@gmail.com
MAIL_FROM_NAME="Huellas Solidarias"

## 4-Instalar dependencias
composer install
npm install

## 5-Ejecutar migraciones
php artisan migrate

## 6-Crear el enlace público a storage para guardar y servir imágenes
php artisan storage:link

## 7-levantar 

### ejecutar comandos los 2 a la vez en la raiz del proyecto 
npm run dev
php artisan serve

### acceder desde el navegador
http://127.0.0.1:8000

## 8-instalar directus cms
### desde el directorio del proyecto ejecutar
npx create-directus-project@latest directus

### muestra opciones tal que asi (ejemplo de las opciones que yo coloque):
√ Choose your database client MySQL / MariaDB / Aurora
√ Database Host: 127.0.0.1
√ Port: 3306
√ Database Name: huellassolidarias  (nombre de la base de datos asociada)
√ Database User: root
√ Database Password:

### por ultimo el mail con el que se accede a directus
√ Email: ejemplo@gmail.com
√ Password: contraseña

### dentro de la carpeta creada "directus"
npx directus start

### acceder a directus desde el navegador
http://localhost:8055/