# Deployment Guide

This guide covers all deployment options and best practices for deploying Weather Pro.

## 📋 Pre-Deployment Checklist

- [ ] API key is configured (`VITE_WEATHER_API_KEY`)
- [ ] Production build tested locally (`npm run build && npm run preview`)
- [ ] All environment variables are set
- [ ] Build output (`dist` folder) is ready
- [ ] Error handling is working correctly
- [ ] Responsive design tested on multiple devices

## 🚀 Quick Deploy Options

### 1. Vercel (Recommended - Easiest)

**Steps:**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variable:
   - Key: `VITE_WEATHER_API_KEY`
   - Value: Your OpenWeatherMap API key
6. Click "Deploy"

**Advantages:**
- Automatic deployments on git push
- Free SSL certificate
- Global CDN
- Zero configuration needed

### 2. Netlify

**Steps:**
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variable:
   - Key: `VITE_WEATHER_API_KEY`
   - Value: Your API key
7. Click "Deploy

### 3. GitHub Pages

**Steps:**
1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/weather-app"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

**Note:** For GitHub Pages, you'll need to handle environment variables differently since they're public. Consider using a backend proxy.

### 4. Traditional Web Hosting

**Steps:**
1. Build the project:
   ```bash
   npm run build
   ```

2. Upload `dist` folder contents to your web server

3. Configure server for SPA routing (see below)

## ⚙️ Server Configuration

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/weather-app/dist;
    index index.html;

    # SPA routing - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/json application/javascript;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### Apache Configuration (.htaccess)

Create `.htaccess` in `dist` folder:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
</IfModule>
```

## 🔐 Environment Variables

### Development
Create `.env` file:
```env
VITE_WEATHER_API_KEY=your_api_key_here
```

### Production
Set environment variables in your deployment platform:

**Vercel:**
- Settings → Environment Variables → Add

**Netlify:**
- Site settings → Environment variables → Add variable

**Docker:**
```dockerfile
ENV VITE_WEATHER_API_KEY=your_api_key_here
```

## 🐳 Docker Deployment

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Build and run:
```bash
docker build -t weather-app .
docker run -p 80:80 weather-app
```

## 📊 Performance Optimization

### Build Optimizations (Already Configured)

- ✅ Code splitting (React, Leaflet separate chunks)
- ✅ Minification with Terser
- ✅ Tree shaking
- ✅ Console log removal in production
- ✅ Source maps disabled for smaller bundles

### Additional Optimizations

1. **Enable CDN** for static assets
2. **Enable HTTP/2** on your server
3. **Use compression** (gzip/brotli)
4. **Set proper cache headers**
5. **Lazy load map components** (already implemented)

## 🔍 Post-Deployment Testing

After deployment, verify:

- [ ] App loads correctly
- [ ] Search functionality works
- [ ] Weather data displays correctly
- [ ] Maps render properly
- [ ] Responsive design works on mobile
- [ ] Error messages display correctly
- [ ] API key is working
- [ ] No console errors
- [ ] Performance is acceptable (Lighthouse score)

## 🐛 Common Issues

### Issue: API Key Not Working
**Solution:** 
- Verify environment variable is set correctly
- Check API key is valid and active
- Ensure variable name is `VITE_WEATHER_API_KEY`

### Issue: 404 on Refresh
**Solution:** 
- Configure server to serve `index.html` for all routes
- See Nginx/Apache configuration above

### Issue: Maps Not Loading
**Solution:**
- Check browser console for errors
- Verify Leaflet CSS is loaded
- Check CORS settings
- Ensure internet connection

### Issue: Build Fails
**Solution:**
- Clear `node_modules`: `rm -rf node_modules && npm install`
- Check Node.js version (18+)
- Verify all dependencies are installed

## 📈 Monitoring

Consider setting up:
- **Error tracking** (Sentry, LogRocket)
- **Analytics** (Google Analytics, Plausible)
- **Performance monitoring** (Lighthouse CI)
- **Uptime monitoring** (UptimeRobot, Pingdom)

## 🔄 Continuous Deployment

### GitHub Actions Example

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
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to server
        # Add your deployment steps here
```

## 📞 Support

For deployment issues:
1. Check the troubleshooting section
2. Review server logs
3. Check browser console for errors
4. Verify environment variables are set

---

**Happy Deploying! 🚀**

