# Company Profile Website

<p>
   This profile website serves as a communication medium between a company and external parties such as clients, readers, or other users. 
</p>
<p>
	This website is a specialized digital platform that serves the purpose of introducing a company to its visitors or readers. 
</p>
<p>
	This kind of directory aims to provide specific information about the company's brand, such as its vision, mission, values, products or services, and even historical background.
</p> 

# Preview

<img src="screenshots/home.png">


# Features

<ol type="1">
	<li>
		Authentication
		<ol type="1">
			<li>Login</li>
			<li>Register</li>
			<li>Forgot Password</li>
			<li>Reset Password</li>
		</ol>
	</li>
	<li>
		Account Management
		<ol type="1">
			<li>Change Password</li>
			<li>Manage Profile</li>
		</ol>
	</li>
	<li>
		General Page
		<ol type="1">
			<li>Home</li>
			<li>About</li>
			<li>Service</li>
			<li>Portfolio</li>
			<li>Article</li>
			<li>FAQ</li>
			<li>Contact</li>
		</ol>
	</li>
</ol>

# Technologies Used

<ol type="1">
	<li>Visual Studio Code</li>
	<li>Modern Web Browser</li>
	<li>Git 2.4</li>
	<li>
		Backend Technologies
		<ol type="1">
			<li>MySQL 5.7 / Maria DB 11.3</li>
			<li>Node JS 20</li>
			<li>Express JS 4.16 for REST API </li>
		</ol>
	</li>
	<li>
		Frontend Technologies
		<ol type="1">
			<li>CSS3</li>
			<li>HTML5</li>
			<li>Bootstrap 5</li>
			<li>Node JS 20</li>
			<li>React JS 18</li>
		</ol>
	</li>
</ol>

## Getting Started
#### 1. Clone the repository and navigate to the directory
```shell
git clone https://github.com/sandyclockup/company-profile-express.git
cd company-profile-express
```

#### 2. Install backend dependencies, please move to directory company-profile-express/backend
```shell
npm install -g sequelize-cli
npm install mysql2 -g
npm install nodemon -g
npm install
```

#### 3. Make a .env file and customize its settings 
```shell
APP_PORT=8000
DB_DATABASE={app-database-name}
DB_HOST={app-database-host}
DB_USERNAME={app-database-username}
DB_PASSWORD={app-database-password}
DB_PORT={app-database-password}
DB_DIALEC=mysql
JWT_SECRET_KEY=secret
```

#### 4. Start MySQL / Maria DB Service , Seed data and Running REST API
```shell
sudo service mysqld start / sudo systemctl start mariadb
CREATE DATABASE {database-name}
mkdir uploads
sequelize db:migrate
sequelize db:seed --seed 20240412161744-create-user.js
sequelize db:seed --seed 20240412164435-create-reference.js
sequelize db:seed --seed 20240412164447-create-contact.js
sequelize db:seed --seed 20240412164452-create-customer.js
sequelize db:seed --seed 20240412164458-create-faq.js
sequelize db:seed --seed 20240412164503-create-service.js
sequelize db:seed --seed 20240412164508-create-slider.js
sequelize db:seed --seed 20240412164514-create-team.js
sequelize db:seed --seed 20240412164520-create-testimonial.js
sequelize db:seed --seed 20240412164528-create-portfolio.js
sequelize db:seed --seed 20240413015206-create-portfolio-image.js
sequelize db:seed --seed 20240413015837-create-article.js
sequelize db:seed --seed 20240413015842-create-article-reference.js
sequelize db:seed --seed 20240413015848-create-article-comment.js
nodemon
```

#### 5. Install frontend dependencies, please move to directory company-profile-express/frontend
```shell
npm install
```

#### 6. Make a .env.local file and customize its settings 
```shell
REACT_APP_TITLE="My Website"
REACT_APP_BACKEND_URL=http://localhost:8000
```

#### 7. Run Application 
```shell
cd frontend
npm start
```

#### 8. Access application by entering [https://localhost:3000](https://localhost:3000) in the browser.

<br/>
<img src="screenshots/article.png">
</br>
<img src="screenshots/service.png">

#### 9. Developer Contact
<ul>
	<li>
		<strong>Linked In</strong> <a target="_blank" href="https://www.linkedin.com/in/sand404/">https://www.linkedin.com/in/sand404/</a>
	</li>
	<li>
		<strong>Facebook</strong> <a target="_blank" href="https://www.facebook.com/sandyandryantz">https://www.facebook.com/sandyandryantz</a>
	</li>
	<li>
		<strong>Instagram</strong> <a target="_blank" href="https://www.instagram.com/sandyandryanto/">https://www.instagram.com/sandyandryanto/</a>
	</li>
	<li>
		<strong>Telegram</strong> <a target="_blank" href="https://t.me/sand404">https://t.me/sand404</a>
	</li>
	<li>
		<strong>Gmail</strong> <a  href="mailto:sandy.andryanto.dev@gmail.com">sandy.andryanto.dev@gmail.com</a>
	</li>
</ul>