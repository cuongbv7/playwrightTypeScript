const config = {
  baseUrl: process.env.BASE_URL || 'https://rahulshettyacademy.com',
  recordVideos: process.env.PWVIDEO || true,
  browser: process.env.BROWSER || 'chromium', // chromium or firefox or webkit
  defaultTimeout: 300 * 1000, // milliseconds
  runHeadless: false,
  runSlow: 0, // milliseconds
};

export default config;
