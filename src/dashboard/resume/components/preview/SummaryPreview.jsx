import React from 'react';

function SummaryPreview({ resumeInfo }) {
  return (
    <div style={styles.summaryContainer}>
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
    marginTop: '10px', // Add some space above the summary
    padding: '10px', // Add padding for better readability
    borderBottom: '1px solid #ccc', // Add a border to separate sections
  },
  summaryText: {
    fontSize: '12px', // Same as the contact details in PersonalDetailPreview
    color: '#444', // Same as the contact details
    lineHeight: '1.5', // Improve readability
    margin: '0', // Remove default margin
  },
};