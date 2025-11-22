# Deployment Guide

## 🚀 Deploying PixelPerfect

This guide covers deploying the PixelPerfect website to various platforms.

## ⚠️ Pre-Deployment Checklist

Before deploying, complete the security checklist in `SECURITY.md`:

- [ ] Implement password hashing
- [ ] Add environment variables
- [ ] Replace example emails with real contact info
- [ ] Enable HTTPS/SSL
- [ ] Add rate limiting
- [ ] Configure proper session management
- [ ] Review legal pages
- [ ] Test all functionality

## 🌐 Deployment Options

### Option 1: Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku App**
```bash
heroku create your-app-name
```

4. **Add Environment Variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=3000
```

5. **Deploy**
```bash
git push heroku main
```

6. **Open App**
```bash
heroku open
```

### Option 2: Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Follow prompts** to configure your deployment

**Note:** Vercel is serverless, so you'll need to adapt the backend or use Vercel's serverless functions.

### Option 3: DigitalOcean App Platform

1. **Connect GitHub Repository**
   - Go to DigitalOcean App Platform
   - Click "Create App"
   - Connect your GitHub repo

2. **Configure Build Settings**
   - Build Command: `npm install`
   - Run Command: `npm start`

3. **Add Environment Variables**
   - Add all variables from `.env.example`

4. **Deploy**
   - Click "Deploy"

### Option 4: Railway

1. **Connect GitHub**
   - Go to railway.app
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Configure**
   - Railway auto-detects Node.js
   - Add environment variables

3. **Deploy**
   - Automatic deployment on push

### Option 5: VPS (Ubuntu/Linux)

1. **SSH into your server**
```bash
ssh user@your-server-ip
```

2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Clone Repository**
```bash
git clone https://github.com/yourusername/pixelperfect.git
cd pixelperfect
```

4. **Install Dependencies**
```bash
npm install
```

5. **Install PM2 (Process Manager)**
```bash
sudo npm install -g pm2
```

6. **Start Application**
```bash
pm2 start server.js --name pixelperfect
pm2 save
pm2 startup
```

7. **Configure Nginx (Reverse Proxy)**
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/pixelperfect
```

Add configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

8. **Enable Site**
```bash
sudo ln -s /etc/nginx/sites-available/pixelperfect /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

9. **Add SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## 🗄️ Database Considerations

### SQLite (Current)
- Good for: Small to medium traffic
- Limitations: Single file, not ideal for high concurrency
- Backup: Copy `messages.db` file regularly

### Upgrade to PostgreSQL (Recommended for Production)

1. **Install pg package**
```bash
npm install pg
```

2. **Update server.js**
```javascript
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
```

3. **Create tables**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fullname TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  project TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔒 Environment Variables

Create `.env` file (never commit this):

```env
# Server
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL=your-database-url

# Security
SESSION_SECRET=your-random-secret-key
JWT_SECRET=your-jwt-secret

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Contact Info
ADMIN_EMAIL=admin@yourdomain.com
SUPPORT_EMAIL=support@yourdomain.com
```

## 📊 Monitoring

### Add Logging
```bash
npm install winston
```

### Add Error Tracking
```bash
npm install @sentry/node
```

### Add Analytics
- Google Analytics
- Plausible Analytics
- Fathom Analytics

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to production
        run: |
          # Add your deployment commands here
```

## 🧪 Testing Before Deployment

```bash
# Run in production mode locally
NODE_ENV=production npm start

# Test all pages
# Test all forms
# Test authentication
# Check console for errors
```

## 📝 Post-Deployment

1. **Test Everything**
   - All pages load
   - Forms submit correctly
   - Authentication works
   - Links are correct

2. **Monitor Logs**
   - Check for errors
   - Monitor performance
   - Watch for security issues

3. **Set Up Backups**
   - Database backups
   - Code backups
   - Regular snapshots

4. **Configure Domain**
   - Point DNS to your server
   - Set up SSL certificate
   - Configure redirects

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

### Database Connection Issues
- Check DATABASE_URL
- Verify database is running
- Check firewall rules

### SSL Certificate Issues
```bash
# Renew certificate
sudo certbot renew
```

## 📚 Additional Resources

- [Node.js Deployment Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [PM2 Documentation](https://pm2.keymetrics.io/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/)

---

**Need Help?** Open an issue on GitHub or check the documentation!
