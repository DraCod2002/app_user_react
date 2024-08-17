# Preparación Backend .Net

* Creamos una base de datos llamada DBUser lo cual usamos SQLServe como motor de base de datos
- create database DBUser
* Procedeemos a crear una tabla Usuario con los campos asocidaos
- create table Usuario(
Id int primary key identity,
Name varchar(50) NOT NULL,
LastName varchar(50) NOT NULL,
Username varchar(50) NOT NULL UNIQUE,
Password Nvarchar(100) NOT NULL,
Email varchar(100) NOT NULL UNIQUE,
PhoneNumber int NOT NULL 
)

* Posteriomente clonamos el respositorio api_user_netCore, lo cual este contendra todo los EndPoinst establecios para conectar con nuetra aplicación de reac

- [@api_user_netCore](https://github.com/DraCod2002/api_user_netCore) 
* En una terminal ejecutamos el comando
- Git clone https://github.com/DraCod2002/api_user_netCore
* Procedemos a abrir nuestra aplicacion en nuetro ide de visual studio enterprise
* para hacer llamdo a nuestra tablas y conectarnos con nuestra base de datos ejecutamos el siguiente comando
- Scaffold-DbContext "Data Source=DESKTOP-K4C4NU8\SQLEXPRESSS;Initial Catalog=DBUser;Integrated Security=True;Trusted_Connection=True;TrustServerCertificate=True;" -Provider Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models
* ese comando nos permitira conectarnos con nuestra base de datos que habiamos creado procedemos a cambiar el Source por el que tenemos en nuestro SQLServe (DESKTOP-K4C4NU8\SQLEXPRESSS)

## Preparación Proyecto React

Una vez hallamos configurado todo nuestro proyecto de backend correctamente procedemos a clonar nuestro proyecto de react:
- git clone https://github.com/DraCod2002/app_user_react.git

* Lo abrimos en nuestro editor de código de preferencia (Visual Studio Code)
* para ello desacrgamos la dependencias necesaria para que nuetro proyecto de FrontEnd funcione correctamente ejecuanto el comando: 
- npm install o npm i
* Después de ello ejecutamos el comando 
- npm run dev 
* Este nos mostrara el contenido principal de nuestro proyecto
![principal](https://github.com/user-attachments/assets/97620684-aaf5-4178-9c4f-080f63fdced0)
