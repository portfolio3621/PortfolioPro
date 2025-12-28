import React from "react";
import { FileText, Shield, AlertTriangle, Globe, Mail } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div
      className="
        min-h-screen px-6 py-16
        bg-gray-50 dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black
        text-gray-800 dark:text-gray-200
        transition-colors duration-300
      "
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FileText className="w-14 h-14 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Terms & Conditions
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Please read these terms and conditions carefully before using
            PortfolioPro.
          </p>
        </div>

        {/* Content Card */}
        <div
          className="
            bg-white dark:bg-white/5
            border border-gray-200 dark:border-white/10
            backdrop-blur-xl
            rounded-2xl p-8 space-y-10
            shadow-lg dark:shadow-xl
          "
        >
          {/* Section */}
          <section className="space-y-3">
            <h2 className="section-heading">
              <Shield className="section-icon" />
              Acceptance of Terms
            </h2>
            <p className="section-text">
              By accessing or using PortfolioPro, you agree to be bound by these
              Terms and Conditions. If you do not agree, please do not use our
              services.
            </p>
          </section>

          {/* Section */}
          <section className="space-y-3">
            <h2 className="section-heading">
              <Globe className="section-icon" />
              Use of Our Service
            </h2>
            <ul className="section-list">
              <li>You must be at least 13 years old to use this platform</li>
              <li>You agree not to misuse or abuse the service</li>
              <li>You are responsible for maintaining account security</li>
            </ul>
          </section>

          {/* Section */}
          <section className="space-y-3">
            <h2 className="section-heading">
              <AlertTriangle className="section-icon" />
              Prohibited Activities
            </h2>
            <ul className="section-list">
              <li>Uploading illegal or harmful content</li>
              <li>Attempting to gain unauthorized access</li>
              <li>Using the platform for fraudulent purposes</li>
            </ul>
          </section>

          {/* Section */}
          <section className="space-y-3">
            <h2 className="section-heading">
              <FileText className="section-icon" />
              Intellectual Property
            </h2>
            <p className="section-text">
              All content, branding, and designs on PortfolioPro are the
              intellectual property of PortfolioPro and may not be reused
              without permission.
            </p>
          </section>

          {/* Section */}
          <section className="space-y-3">
            <h2 className="section-heading">
              <Mail className="section-icon" />
              Contact Information
            </h2>
            <p className="section-text">
              If you have any questions regarding these Terms & Conditions,
              please contact us at:
            </p>
            <p className="text-indigo-600 dark:text-indigo-400 font-medium">
              portfoliopro12@gmail.com
            </p>
          </section>
        </div>

        {/* Footer */}
        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;