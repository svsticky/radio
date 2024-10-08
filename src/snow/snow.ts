// Check if the date is between 1st of December and March 1st
const today = new Date();
const mm = today.getMonth() + 1;
const isWinter = (mm >= 12 || mm < 3);

if (isWinter) {
  // Add snow stylesheet
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'snow.css';
  document.head.appendChild(link);

  // Prepend snow group
  const snowGroup = document.createElement('div');
  snowGroup.id = 'snow-group';
  document.body.prepend(snowGroup);

  // Create 200 snowflakes
  for (let i = 0; i < 200; i++) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowGroup.appendChild(snowflake);
  }
}
