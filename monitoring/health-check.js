// Simple health check script for production monitoring
const https = require('https');
const http = require('http');

// Configuration
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://task-manager-group-bse-24-9.vercel.app';
const BACKEND_URL = process.env.BACKEND_URL || 'https://task-manager-backend-23yh.onrender.com';

// Health check function
function checkHealth(url, name) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(url, (res) => {
      if (res.statusCode === 200) {
        console.log(`✅ ${name}: Healthy (${res.statusCode})`);
        resolve({ healthy: true, status: res.statusCode, name });
      } else {
        console.log(`⚠️  ${name}: Warning (${res.statusCode})`);
        resolve({ healthy: false, status: res.statusCode, name });
      }
    });
    
    req.on('error', (err) => {
      console.log(`❌ ${name}: Error - ${err.message}`);
      resolve({ healthy: false, error: err.message, name });
    });
    
    req.setTimeout(10000, () => {
      console.log(`⏰ ${name}: Timeout`);
      req.destroy();
      resolve({ healthy: false, error: 'Timeout', name });
    });
  });
}

// Run health checks
async function runHealthChecks() {
  console.log('🔍 Starting health checks...');
  console.log(`Frontend: ${FRONTEND_URL}`);
  console.log(`Backend: ${BACKEND_URL}`);
  console.log('---');
  
  const results = await Promise.all([
    checkHealth(FRONTEND_URL, 'Frontend'),
    checkHealth(BACKEND_URL, 'Backend'),
    checkHealth(`${BACKEND_URL}/health`, 'Backend API')
  ]);
  
  console.log('---');
  console.log('📊 Health Check Summary:');
  
  const allHealthy = results.every(result => result.healthy);
  
  results.forEach(result => {
    const status = result.healthy ? '✅ Healthy' : '❌ Unhealthy';
    console.log(`${result.name}: ${status}`);
  });
  
  if (allHealthy) {
    console.log('🎉 All services are healthy!');
    process.exit(0);
  } else {
    console.log('⚠️  Some services are unhealthy!');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runHealthChecks();
}

module.exports = { runHealthChecks, checkHealth };
