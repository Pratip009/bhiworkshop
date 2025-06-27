const SmsTermsConditions = () => {
  return (
    <section className="bg-white py-12 px-6 sm:px-10 lg:px-24 font-['Nunito']">
      <div className="max-w-4xl mx-auto text-gray-800 space-y-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          SMS Terms & Conditions – Bright Horizon Institute
        </h1>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            SMS Consent Communication:
          </h2>
          <p>
            The information (Phone Numbers) obtained as part of the SMS consent
            process will not be shared with third parties for marketing
            purposes.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            2. Types of SMS Communications:
          </h2>
          <p>
            If you have consented to receive text messages from{" "}
            <strong>Bright Horizon Institute</strong>, you may receive messages
            related to the following:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Appointment reminders</li>
            <li>Follow-up messages</li>
            <li>Billing inquiries</li>

            <li>Conversations internal & external</li>
          </ul>
          <p>
            Hi John Doe, this is a reminder about your upcoming
            appointment with Bright Horizon Institute on 26th Sep , 2025 at 10.00 AM. We look
            forward to seeing you!
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Message Frequency:</h2>
          <p>
            You may receive approximately 5-10 messages per week related to your
            requests. However, the frequency may vary depending on the nature of
            the communication.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Potential Fees for SMS Messaging:
          </h2>
          <p>
            Please note that standard message and data rates may apply,
            depending on your carrier’s pricing plan. These fees may vary if the
            message is sent domestically or internationally.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Opt-In Method:</h2>
          <p>
            You may opt in to receive SMS messages from{" "}
            <strong>Bright Horizon Institute</strong> in the following way:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>We ask by email.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Opt-Out Method:</h2>
          <p>
            You can opt out of receiving SMS messages at any time. To do so,
            simply reply <strong>&quot;STOP&quot;</strong> to any SMS message you receive.
            Alternatively, you can contact us directly to request removal from
            our messaging list.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Help:</h2>
          <p>
            If you are experiencing any issues, you can reply with the keyword{" "}
            <strong>HELP</strong>. Or, you can get help directly from us at:{" "}
            <a
              href="mailto:admin@bhilearning.com"
              className="text-blue-600 underline"
            >
              admin@bhilearning.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Additional Options:</h2>
          <p>
            If you do not wish to receive SMS messages, you can choose not to
            check the SMS consent box on our forms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Standard Messaging Disclosures:
          </h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Message and data rates may apply.</li>
            <li>You can opt out at any time by texting &quot;STOP&quot;.</li>
            <li>
              For assistance, text &quot;HELP&quot; or visit our{" "}
              <a href="/privacy-policy" className="text-blue-600 underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="/terms-and-conditions"
                className="text-blue-600 underline"
              >
                Terms and Conditions
              </a>{" "}
              pages.
            </li>
            <li>Message frequency may vary.</li>
          </ul>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default SmsTermsConditions;
