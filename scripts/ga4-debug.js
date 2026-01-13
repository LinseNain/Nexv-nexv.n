#!/usr/bin/env node

// 🐛 Google Analytics 4 Debug Script
// Helps diagnose and fix GA4 implementation issues

console.log('🔍 Google Analytics 4 Diagnostic Tool\n');

// Check environment variables
console.log('📋 Checking Environment Configuration...\n');

const envVars = {
  'NEXT_PUBLIC_GA_MEASUREMENT_ID': process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  'NEXT_PUBLIC_SITE_URL': process.env.NEXT_PUBLIC_SITE_URL,
  'NODE_ENV': process.env.NODE_ENV
};

Object.entries(envVars).forEach(([key, value]) => {
  const status = value ? '✅ SET' : '❌ MISSING';
  console.log(`${key}: ${status} ${value || ''}`);
});

console.log('\n🔧 Common GA4 Issues Checklist:\n');

const checklist = [
  '✅ Measurement ID is correctly configured (G-2P6D7K)',
  '✅ Environment variables are set in .env.local',
  '✅ Google Analytics script loads after interactive',
  '✅ gtag function is properly initialized',
  '✅ Page views are tracked on route changes',
  '✅ Cookies are enabled in browser',
  '✅ No ad blockers interfering with GA scripts',
  '✅ Correct domain configured in GA4 property'
];

checklist.forEach(item => console.log(item));

console.log('\n🚀 Quick Fix Commands:\n');

console.log('1. Create .env.local file:');
console.log('   echo "NEXT_PUBLIC_GA_MEASUREMENT_ID=G-2P6D7K" > .env.local\n');

console.log('2. Test GA4 implementation:');
console.log('   npm run dev\n');

console.log('3. Check browser console for:');
console.log('   - "✅ Google Analytics script loaded successfully"');
console.log('   - "✅ gtag initialized with Measurement ID: G-2P6D7K"');
console.log('   - "📊 GA4 Pageview tracked: /"\n');

console.log('4. Verify in GA4 Real-time reports:');
console.log('   - Go to GA4 > Reports > Real-time');
console.log('   - Refresh your website');
console.log('   - Check if users appear in real-time\n');

console.log('5. Common troubleshooting:');
console.log('   - Clear browser cache and cookies');
console.log('   - Disable ad blockers temporarily');
console.log('   - Check if GA4 property domain matches your site');
console.log('   - Ensure enhanced measurement is enabled\n');

// Test the measurement ID format
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
if (measurementId) {
  const isValidFormat = /^G-[A-Z0-9]{10}$/.test(measurementId);
  console.log(`🎯 Measurement ID Format Check: ${isValidFormat ? '✅ VALID' : '❌ INVALID'}`);
  console.log(`   Expected: G-XXXXXXXXXX`);
  console.log(`   Found: ${measurementId}\n`);
}

console.log('📝 Need Help?');
console.log('- Check GA4 Admin > Property Settings > Data Streams');
console.log('- Verify domain in GA4 property settings matches your site');
console.log('- Ensure enhanced measurement is enabled in GA4');
console.log('- Check browser developer tools Network tab for GA requests\n');

console.log('💡 Pro Tips:');
console.log('- Test with incognito/private browsing mode');
console.log('- Use GA4 DebugView for detailed event tracking');
console.log('- Check for JavaScript errors in browser console');
console.log('- Verify gtag is not blocked by content security policy\n');

process.exit(0);