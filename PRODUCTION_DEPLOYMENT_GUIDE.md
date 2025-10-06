# 🚀 Production Deployment Guide

This guide explains how to deploy the Task Manager application to production using the CI/CD pipeline we've set up.

## 📋 Prerequisites

- ✅ GitHub repository with CI/CD pipeline configured
- ✅ Vercel account for frontend hosting
- ✅ Render account for backend hosting
- ✅ Production environment secrets configured in GitHub

## 🎯 Production Deployment Process

### Step 1: Prepare for Production

1. **Ensure all tests pass**:
   ```bash
   # Run tests locally
   cd server && npm test
   cd ../client && npm test
   ```

2. **Verify staging environment is working**:
   - Frontend: https://task-manager-group-bse-24-9.vercel.app
   - Backend: https://task-manager-backend-23yh.onrender.com

### Step 2: Production Deployment

#### Option A: Automatic Deployment (Recommended)
1. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Release: Production deployment"
   git push origin main
   ```

2. **GitHub Actions will automatically**:
   - Run all tests
   - Build the application
   - Deploy to production (requires approval)

3. **Approve deployment**:
   - Go to GitHub → Actions
   - Click on the production deployment workflow
   - Click "Review deployments"
   - Approve the production deployment

#### Option B: Manual Deployment
1. **Go to GitHub Actions**
2. **Select "Production Deployment" workflow**
3. **Click "Run workflow"**
4. **Select main branch and click "Run workflow"**

### Step 3: Verify Production Deployment

1. **Check deployment status**:
   - Go to GitHub Actions to see deployment progress
   - Look for green checkmarks on all jobs

2. **Test production endpoints**:
   ```bash
   # Test backend health
   curl https://your-production-backend-url.com/health
   
   # Test frontend
   curl https://your-production-frontend-url.com
   ```

3. **Run health checks**:
   ```bash
   node monitoring/health-check.js
   ```

## 🔄 Rollback Procedures

### Automatic Rollback
If deployment fails, GitHub Actions will automatically:
- Stop the deployment process
- Keep the previous version running
- Notify the team of the failure

### Manual Rollback

#### Windows:
```bash
scripts/rollback.bat
```

#### Linux/Mac:
```bash
./scripts/rollback.sh
```

#### Rollback specific services:
```bash
# Rollback only frontend
scripts/rollback.bat --frontend

# Rollback only backend
scripts/rollback.bat --backend
```

## 📊 Monitoring and Health Checks

### Health Check Endpoints

- **Frontend**: `GET /` - Should return 200
- **Backend Health**: `GET /health` - Should return 200 with status
- **Backend API**: `GET /tasks` - Should return 200 with tasks array

### Monitoring Dashboard

The monitoring dashboard tracks:
- ✅ **Uptime**: Service availability
- ⏱️ **Response Time**: How fast services respond
- 📊 **Error Rate**: Percentage of failed requests
- 🔍 **Status Codes**: Distribution of HTTP response codes

### Running Health Checks

```bash
# Run health checks manually
node monitoring/health-check.js

# Check specific service
curl -f https://your-production-url.com/health
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Deployment Fails
**Symptoms**: Red X in GitHub Actions
**Solution**: 
- Check the logs in GitHub Actions
- Verify all tests pass locally
- Check environment variables are set correctly

#### 2. Health Checks Fail
**Symptoms**: Health check script returns errors
**Solution**:
- Check if services are running
- Verify URLs are correct
- Check network connectivity

#### 3. Frontend Can't Connect to Backend
**Symptoms**: "Failed to fetch" errors in browser
**Solution**:
- Verify `REACT_APP_API_URL` environment variable is set
- Check CORS configuration in backend
- Ensure backend is running and accessible

### Emergency Procedures

#### 1. Immediate Rollback
```bash
# Full rollback
scripts/rollback.bat

# Or rollback specific service
scripts/rollback.bat --frontend
```

#### 2. Check Service Status
```bash
# Check all services
node monitoring/health-check.js

# Check individual services
curl -f https://your-frontend-url.com
curl -f https://your-backend-url.com/health
```

#### 3. Contact Team
- Notify team via Slack/email
- Document the issue
- Create incident report

## 📈 Production Metrics

### Key Performance Indicators (KPIs)

- **Uptime**: > 99.5%
- **Response Time**: < 2 seconds
- **Error Rate**: < 1%
- **Deployment Success Rate**: > 95%

### Monitoring Tools

- **GitHub Actions**: Deployment pipeline monitoring
- **Health Check Script**: Service availability monitoring
- **Browser DevTools**: Frontend performance monitoring
- **Server Logs**: Backend error tracking

## 🔒 Security Considerations

### Production Security Checklist

- ✅ **HTTPS Enabled**: All production URLs use HTTPS
- ✅ **Environment Variables**: Secrets stored securely in GitHub
- ✅ **CORS Configuration**: Properly configured for production domains
- ✅ **Database Security**: Production database isolated from staging
- ✅ **Access Control**: Limited access to production environments

### Security Best Practices

1. **Never commit secrets** to the repository
2. **Use environment variables** for all sensitive configuration
3. **Regular security updates** for dependencies
4. **Monitor for vulnerabilities** in production
5. **Implement proper logging** for security events

## 📞 Support and Escalation

### When to Escalate

- Production service is down for > 5 minutes
- Data loss or corruption detected
- Security incident suspected
- Multiple failed deployments

### Contact Information

- **Development Team**: [Your team contact]
- **DevOps Team**: [DevOps contact]
- **Emergency Contact**: [Emergency contact]

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Render Deployment Guide](https://render.com/docs)
- [Monitoring Best Practices](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows)

---

**Last Updated**: September 13, 2025  
**Version**: 1.0.0  
**Maintained By**: Task Manager Development Team
