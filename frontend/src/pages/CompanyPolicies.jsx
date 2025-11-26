import Header from '../components/Header'
import Footer from '../components/Footer'

function CompanyPolicies() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-[#1a2332] px-8 py-16 lg:py-24 rounded-b-[40px]">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Legal Policies</span>
          </h1>
          <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-4xl mx-auto">
            Privacy Policy & Terms and Conditions
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Last Updated */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Last Updated:</span> November 24, 2025
          </p>
        </div>

        {/* Privacy Policy Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-blue-500">
              Privacy Policy
            </h2>

            {/* Introduction */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                BPH Growth Fund is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services, including loan applications and business consultations.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using our services, you consent to the data practices described in this policy. If you do not agree with this policy, please do not access or use our services.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h3>
              
              <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-4">2.1 Personal Information</h4>
              <p className="text-gray-700 leading-relaxed mb-3">
                We collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>Apply for a loan or business consultation</li>
                <li>Register for an account on our platform</li>
                <li>Contact us through our website or customer service channels</li>
                <li>Subscribe to our newsletters or marketing communications</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                This information may include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Full name and contact information (email, phone number, address)</li>
                <li>Bank Verification Number (BVN)</li>
                <li>Employment details and income information</li>
                <li>Business information and financial statements</li>
                <li>National Identification Number (NIN) or other government-issued ID</li>
                <li>Bank account details</li>
                <li>Credit history and financial background</li>
              </ul>

              <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-4">2.2 Automatically Collected Information</h4>
              <p className="text-gray-700 leading-relaxed mb-3">
                When you access our website, we may automatically collect certain information, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Processing and evaluating loan applications</li>
                <li>Providing business consultation services</li>
                <li>Verifying your identity and preventing fraud</li>
                <li>Conducting credit checks and risk assessments</li>
                <li>Communicating with you about your applications and services</li>
                <li>Complying with legal and regulatory requirements</li>
                <li>Improving our services and website functionality</li>
                <li>Sending promotional materials and updates (with your consent)</li>
                <li>Maintaining records for audit and compliance purposes</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Information Sharing and Disclosure</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li><strong>Credit Bureaus:</strong> To verify your creditworthiness and report loan performance</li>
                <li><strong>Financial Institutions:</strong> For loan processing and disbursement</li>
                <li><strong>Service Providers:</strong> Third-party vendors who assist with our operations (e.g., payment processors, IT services)</li>
                <li><strong>Legal Processes:</strong> In response to court orders, subpoenas, or legal proceedings</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We do not sell your personal information to third parties for marketing purposes.
              </p>
            </div>

            {/* Data Security */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Data Security</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We implement appropriate technical and organizational security measures to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>Encryption of sensitive data during transmission and storage</li>
                <li>Secure servers with firewall protection</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls limiting employee access to personal data</li>
                <li>Staff training on data protection and confidentiality</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </div>

            {/* Data Retention */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Data Retention</h3>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Loan application records are typically retained for a minimum of 7 years in accordance with Nigerian financial regulations.
              </p>
            </div>

            {/* Your Rights */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">7. Your Rights</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Under the Nigeria Data Protection Regulation (NDPR), you have the following rights:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Right to Access:</strong> Request copies of your personal data</li>
                <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Right to Deletion:</strong> Request deletion of your data (subject to legal retention requirements)</li>
                <li><strong>Right to Object:</strong> Object to processing of your data for certain purposes</li>
                <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service provider</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                To exercise these rights, please contact us using the information provided at the end of this policy.
              </p>
            </div>

            {/* Cookies */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">8. Cookies and Tracking Technologies</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences, but disabling cookies may affect website functionality.
              </p>
            </div>

            {/* Third-Party Links */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">9. Third-Party Links</h3>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </div>

            {/* Changes to Policy */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">10. Changes to This Privacy Policy</h3>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the new policy on our website with an updated "Last Updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
              </p>
            </div>
          </div>
        </section>

        {/* Terms and Conditions Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-blue-500">
              Terms and Conditions
            </h2>

            {/* Acceptance of Terms */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h3>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using the BPH Growth Fund website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            {/* Eligibility */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Eligibility</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                To be eligible for our loan and consultation services, you must:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Be at least 18 years of age</li>
                <li>Be a Nigerian citizen or legal resident</li>
                <li>Have a valid Bank Verification Number (BVN)</li>
                <li>Provide accurate and complete information during registration and application</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Not be currently bankrupt or subject to any insolvency proceedings</li>
              </ul>
            </div>

            {/* Loan Services */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Loan Services</h3>
              
              <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-4">3.1 Loan Application</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>Submission of a loan application does not guarantee approval</li>
                <li>We reserve the right to approve or reject any application at our sole discretion</li>
                <li>All information provided must be accurate, complete, and current</li>
                <li>False or misleading information may result in application rejection and potential legal action</li>
              </ul>

              <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-4">3.2 Interest Rates and Fees</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>Interest rates and fees are disclosed during the application process</li>
                <li>Rates may vary based on loan type, amount, tenure, and creditworthiness</li>
                <li>Late payment fees and penalties will apply for overdue payments</li>
                <li>Processing fees are non-refundable once loan processing begins</li>
              </ul>

              <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-4">3.3 Repayment</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>Borrowers must repay loans according to the agreed schedule</li>
                <li>Payments can be made via bank transfer, direct debit, or other approved methods</li>
                <li>Early repayment is allowed and may be subject to early settlement fees</li>
                <li>Failure to repay may result in negative credit reporting, legal action, and debt recovery procedures</li>
              </ul>

              <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-4">3.4 Default and Collection</h4>
              <p className="text-gray-700 leading-relaxed mb-3">
                In the event of loan default:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Your account will be reported to credit bureaus</li>
                <li>We may engage debt collection agencies</li>
                <li>Legal action may be taken to recover outstanding amounts</li>
                <li>Additional fees and penalties will accrue on overdue balances</li>
                <li>Collateral (if provided) may be seized and liquidated</li>
              </ul>
            </div>

            {/* Consultation Services */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Business Consultation Services</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Consultation services are provided based on information you provide</li>
                <li>Advice and recommendations are for informational purposes and do not guarantee business success</li>
                <li>You are responsible for implementing any recommendations at your own risk</li>
                <li>Consultation fees are non-refundable unless otherwise stated</li>
                <li>Cancellations must be made at least 24 hours in advance to avoid charges</li>
              </ul>
            </div>

            {/* User Obligations */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">5. User Obligations</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                As a user of our services, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Provide truthful, accurate, and complete information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Notify us immediately of any unauthorized access to your account</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not attempt to circumvent security measures or access restricted areas</li>
                <li>Not use our services to engage in fraudulent activities</li>
                <li>Comply with all applicable Nigerian laws and regulations</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Intellectual Property Rights</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                All content on this website, including text, graphics, logos, images, and software, is the property of BPH Growth Fund or its licensors and is protected by Nigerian and international copyright laws.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">7. Limitation of Liability</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                To the maximum extent permitted by law:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>We are not liable for any indirect, incidental, or consequential damages arising from your use of our services</li>
                <li>We do not guarantee uninterrupted or error-free service</li>
                <li>We are not responsible for losses resulting from technical failures, system downtime, or data breaches beyond our control</li>
                <li>Our total liability shall not exceed the amount of fees paid by you for the specific service in question</li>
              </ul>
            </div>

            {/* Indemnification */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">8. Indemnification</h3>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify and hold harmless BPH Growth Fund, its officers, directors, employees, and agents from any claims, losses, damages, liabilities, and expenses (including legal fees) arising from your use of our services, violation of these terms, or infringement of any third-party rights.
              </p>
            </div>

            {/* Termination */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">9. Termination</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We reserve the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>Suspend or terminate your account at any time for violation of these terms</li>
                <li>Refuse service to anyone for any reason</li>
                <li>Modify or discontinue services without prior notice</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Upon termination, all outstanding loan balances become immediately due and payable.
              </p>
            </div>

            {/* Dispute Resolution */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">10. Dispute Resolution</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                In the event of any dispute arising from these terms or our services:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>We encourage parties to first attempt resolution through good-faith negotiation</li>
                <li>If negotiation fails, disputes shall be referred to mediation</li>
                <li>Any legal proceedings shall be subject to the exclusive jurisdiction of Nigerian courts</li>
                <li>These terms shall be governed by the laws of the Federal Republic of Nigeria</li>
              </ul>
            </div>

            {/* Force Majeure */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">11. Force Majeure</h3>
              <p className="text-gray-700 leading-relaxed">
                We shall not be liable for any failure or delay in performing our obligations due to circumstances beyond our reasonable control, including but not limited to natural disasters, war, terrorism, riots, embargoes, government actions, or technical failures affecting third-party service providers.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">12. Changes to Terms</h3>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.
              </p>
            </div>

            {/* Severability */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">13. Severability</h3>
              <p className="text-gray-700 leading-relaxed">
                If any provision of these Terms and Conditions is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>
            </div>

            {/* Entire Agreement */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">14. Entire Agreement</h3>
              <p className="text-gray-700 leading-relaxed">
                These Terms and Conditions, together with our Privacy Policy, constitute the entire agreement between you and BPH Growth Fund regarding the use of our services and supersede all prior agreements and understandings.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <div className="bg-blue-50 rounded-lg shadow-md p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our Terms and Conditions, please contact us:
            </p>
            <div className="space-y-3 text-gray-700">
              <p><strong>BPH Growth Fund</strong></p>
              <p>Email: <a href="mailto:legal@bphgrowthfund.com" className="text-blue-600 hover:text-blue-800 underline">support@bphgrowth.com</a></p>
              <p>Phone: <a href="tel:+2348012345678" className="text-blue-600 hover:text-blue-800">+234 708 009 6148</a></p>
            </div>
          </div>
        </section>

        {/* Acknowledgment */}
        <section className="mb-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Acknowledgment</h3>
            <p className="text-gray-700 leading-relaxed">
              By using BPH Growth Fund's services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy and Terms and Conditions. You also acknowledge that you understand your rights under the Nigeria Data Protection Regulation (NDPR) and applicable consumer protection laws.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default CompanyPolicies;