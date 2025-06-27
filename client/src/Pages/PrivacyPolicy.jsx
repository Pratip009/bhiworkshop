const PrivacyPolicy = () => {
  return (
    <section className="bg-gray-50 py-12 px-6 sm:px-10 lg:px-24 font-['Nunito']">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-10 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 border-b pb-4">
          Privacy Policy
        </h1>

        <p className="mb-6 text-gray-700 text-lg">
          At <strong>Bright Horizon Institute</strong>, your privacy is important to us. This Privacy Policy outlines how we collect, use, share, and protect your personal information when you interact with our services, both online and offline. By using our website or enrolling in our programs, you agree to the practices described in this policy.
        </p>

        <div className="space-y-8 text-gray-700 text-base leading-relaxed">

          {/* Main Structured Policy */}
          <div>
            <h2 className="font-bold text-xl text-gray-800 mb-2">1. How We Collect Your Personal Information</h2>
            <ul className="list-disc list-inside">
              <li>Online registration forms and sign-in sheets</li>
              <li>Email communications</li>
              <li>Website cookies and analytics tools</li>
              <li>Phone calls or text messages</li>
              <li>Offline interactions during workshops or events</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl text-gray-800 mb-2">2. What Personal Information We Collect</h2>
            <ul className="list-disc list-inside">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number (including mobile for SMS communication)</li>
              <li>Mailing address</li>
              <li>City/State/Zip</li>
              <li>IP address (when visiting our website)</li>
              <li>Payment and billing information</li>
              <li>Identification documents (e.g., driver’s license)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl text-gray-800 mb-2">3. How We Use Your Personal Information</h2>
            <ul className="list-disc list-inside">
              <li>Register you for workshops and training</li>
              <li>Provide customer service and program updates</li>
              <li>Communicate via SMS or email (with your consent)</li>
              <li>Process payments and issue receipts</li>
              <li>Improve user experience and course offerings</li>
              <li>Share important scheduling or policy updates</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl text-gray-800 mb-2">4. How and Why We Share Personal Information with Third Parties</h2>
            <ul className="list-disc list-inside">
              <li>Process transactions (e.g., payment processors)</li>
              <li>Send communications (e.g., SMS/email platforms)</li>
              <li>Maintain our website or internal systems</li>
            </ul>
            <p className="mt-2 font-semibold">
              We do not sell or share your personal information with third parties for marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-gray-800 mb-2">5. SMS Consent and Communication</h2>
            <p>
              <strong>
                Mobile Opt-In, SMS Consent, and phone numbers collected for SMS communication purposes will not be shared with any third party or affiliates for marketing purposes.
              </strong>{" "}
              You may receive updates about schedules, reminders, and relevant information. You can opt out at any time by replying “STOP” to our messages.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-gray-800 mb-2">6. Data Retention</h2>
            <p>
              We retain personal information only as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-gray-800 mb-2">7. How We Protect Your Information</h2>
            <p>
              We implement appropriate administrative, technical, and physical safeguards to protect your data from unauthorized access, disclosure, or misuse.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-gray-800 mb-2">8. Your Rights</h2>
            <ul className="list-disc list-inside">
              <li>Request access to your data</li>
              <li>Request correction or deletion of your personal information</li>
              <li>Withdraw your consent for communication at any time</li>
            </ul>
            <p className="mt-2">To exercise these rights, please contact us using the information below.</p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-gray-800 mb-2">9. Contact Us</h2>
            <p>
              <strong>Bright Horizon Institute</strong><br />
              📧 <a href="mailto:admin@bhilearning.com" className="text-blue-600 hover:underline">admin@bhilearning.com</a><br />
              📞 551-344-1485
            </p>
          </div>

         

          <p className="text-sm text-gray-500 mt-10 italic">
            This privacy policy may be updated periodically. Please check back to stay informed about our privacy practices.
          </p>

          <p className="text-sm text-gray-500 text-right italic">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
