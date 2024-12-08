import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <span className="text-blue-500">TechMate</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            The ultimate platform for building meaningful connections, one profile at a time.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">What is TechMate?</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-6">
            TechMate is a platform designed to help individuals connect with like-minded
            tech enthusiasts. Whether you’re looking to network professionally, find a mentor,
            or collaborate on projects, our app provides a seamless way to request, connect, and communicate.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-blue-100 dark:bg-gray-700 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Profile Requests</h3>
              <p className="text-gray-800 dark:text-gray-300">
                Easily send connection requests to others by exploring their profiles. Tailored
                suggestions ensure you find people relevant to your interests and goals.
              </p>
            </div>
            <div className="p-6 bg-blue-100 dark:bg-gray-700 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Connection Management</h3>
              <p className="text-gray-800 dark:text-gray-300">
                Accept, reject, or ignore connection requests. You’re in full control of who
                can connect with you.
              </p>
            </div>
            <div className="p-6 bg-blue-100 dark:bg-gray-700 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Chat with Connections</h3>
              <p className="text-gray-800 dark:text-gray-300">
                Engage in meaningful conversations with your connections via our real-time
                chat feature. Stay connected and grow your network.
              </p>
            </div>
            <div className="p-6 bg-blue-100 dark:bg-gray-700 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Privacy & Control</h3>
              <p className="text-gray-800 dark:text-gray-300">
                Your privacy matters. Choose what information you want to share and connect
                securely with others.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Why Choose TechMate?</h2>
          <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
            <li>Find individuals who share your interests and goals in tech.</li>
            <li>Stay in touch with connections through a simple chat interface.</li>
            <li>Maintain control over your network with robust request handling.</li>
            <li>Enjoy a modern, user-friendly interface designed for all devices.</li>
          </ul>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Get Started Today!</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Take the first step toward meaningful connections. Sign up now and explore the
            possibilities with TechMate.
          </p>
          <Link to="/login" className="btn btn-primary px-6 py-3 text-lg rounded-lg shadow-lg" >
            Sign Up Now
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Landing;
