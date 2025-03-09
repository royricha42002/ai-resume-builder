
import { Button } from "@/components/ui/button";
import Navbar from "@/components/custom/navbar";
import "./landingpage.css"; // Import external CSS
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function Home() {  
  const { isSignedIn } = useUser(); 

  return (
    <div>
      <Navbar /> {/* Keep the Navbar */}
      
      {/* Hero Section */}
      <div className="hero">
        <h1 className="hero-title">AI-Powered Resume Builder</h1>
        <p className="hero-subtitle">
          Create stunning, professional resumes in minutes with the power of AI.
        </p>
        <Link to={isSignedIn ? "/dashboard" : "/auth/signin"}>
          <Button className="hero-btn" >Get Started</Button>
        </Link>
      </div>

      {/* Features Section */}
      <div className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>AI-Generated Content</h3>
            <p>Let AI craft the perfect resume tailored to your experience.</p>
          </div>
          <div className="feature-card">
            <h3>Real Time Editing</h3>
            <p>Get a real time preview of your resume</p>
          </div>
          <div className="feature-card">
            <h3>One-Click Customization</h3>
            <p>Modify fonts, colors, and layout with ease.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <p>"This resume builder saved me hours! The AI-generated content was spot on."</p>
          <span>- Alex Johnson</span>
        </div>
        <div className="testimonial">
          <p>"I landed my dream job thanks to this tool. The templates are amazing!"</p>
          <span>- Sarah Williams</span>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2025 AI Resume Builder. All rights reserved.</p>
      </footer>
    </div>
  );
}
