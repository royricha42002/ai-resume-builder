import React from 'react';

function SummaryPreview({ resumeInfo }) {
  return (
    <div style={styles.summaryContainer}>
      {/* About Me Heading */}
      <h2 style={styles.heading}>About Me</h2>

      {/* Summary Text */}
      <p style={styles.summaryText}>
        {resumeInfo?.summary || "No summary provided."}
      </p>
    </div>
  );
}

export default SummaryPreview;

// Inline styles
const styles = {
  summaryContainer: {
    marginTop: '0px', // Add some space above the summary
    paddingLeft: '15px', // Add padding for better readability
    paddingRight: '15px',
    paddingBottom: '20px',
    paddingTop: '20px',
    borderBottom: '1px solid #ccc', // Add a border to separate sections
    textAlign: 'left', // Align content to the left
  },
  heading: {
    fontSize: '24px', // Attractive font size for heading
    fontWeight: '600', // Bold font weight
    color: '#444', // Dark color for heading
    marginBottom: '5px', // Space below the heading
    fontFamily: 'Georgia, serif', // Attractive font
    textAlign: 'center',

  },
  summaryText: {
    fontSize: '14px', // Slightly larger font size for better readability
    color: '#444', // Same as the contact details
    lineHeight: '1.25', // Improve readability
    padding: '10px',
    margin: '0', // Remove default margin
    fontFamily: 'Georgia, serif', // Consistent font with contact details
  },
};