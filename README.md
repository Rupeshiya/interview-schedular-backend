# interview-schedular-backend
Backend for interview schedular


### How to use?
1. Clone ```git clone https://github.com/Rupeshiya/interview-schedular-backend.git```
2. Move to project directory
3. Install all the dependencies using ```npm install``
4. Now run development server using ```npm run dev```

### Pre-requisite 
1. Create an ```.env``` file in root directory of the project and add
```
  PORT=5000
  NODE_ENV='development'
  JWT_SECRET='thisismysupersecrettokenjustkidding'
  SENDGRID_API_KEY='<YOUR SENDGRID API KEY>'
  SENDGRID_FROM_EMAIL_ADDRESS='<YOUR SENDGRID EMAIL>'
  cloud_name = '<YOUR CLOUDINARY CLOUD NAME>';
  api_key = '<YOUR CLOUDINARY API KEY>;
  api_secret = '<YOUR CLOUDINARY API KEY>;
  
```