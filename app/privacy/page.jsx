'use client'
import Navbar from '@/components/NavBar'
import Footer from '../../components/Footer'

export default function TermsAndPrivacyPage() {
    return (
        <div className="flex flex-col min-h-screen bg-pink-50">
            <Navbar /> 
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-bold text-pink-800 mb-6">Terms of Service and Privacy Policy</h1>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-pink-700 mb-4">Terms of Service</h2>
                        <ol className="list-decimal list-inside text-pink-600 space-y-4">
                            <li>
                                <strong>Acceptance of Terms:</strong> By accessing or using our services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.
                            </li>
                            <li>
                                <strong>Changes to Terms:</strong> We may update these terms from time to time. Continued use of the website after changes implies acceptance of the new terms.
                            </li>
                            <li>
                                <strong>Use of Services:</strong> You must use our services in compliance with applicable laws and regulations. You agree not to misuse our website, including attempts to gain unauthorized access or distribute harmful software.
                            </li>
                            <li>
                                <strong>Accounts and Security:</strong> You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately of any unauthorized use of your account.
                            </li>
                            <li>
                                <strong>Content Ownership:</strong> All content, trademarks, and logos on this website are the property of Adoptive or its respective owners. You may not copy, distribute, or use any content without prior permission.
                            </li>
                            <li>
                                <strong>Limitation of Liability:</strong> Adoptive is not responsible for any direct, indirect, incidental, or consequential damages arising from the use of our services.
                            </li>
                            <li>
                                <strong>Termination:</strong> We reserve the right to suspend or terminate your access to our services at our discretion, without prior notice.
                            </li>
                        </ol>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-pink-700 mb-4">Privacy Policy</h2>
                        <ol className="list-decimal list-inside text-pink-600 space-y-4">
                            <li>
                                <strong>Information We Collect:</strong>
                                <ul className="list-disc list-inside ml-6 space-y-2">
                                    <li>
                                        <strong>Personal Information:</strong> When you sign up, we may collect your name, email address, phone number, and other necessary details.
                                    </li>
                                    <li>
                                        <strong>Non-Personal Information:</strong> We may collect technical data like your IP address, browser type, and device information.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <strong>How We Use Your Information:</strong> To provide and improve our services, communicate with you, and analyze usage patterns to enhance user experience.
                            </li>
                            <li>
                                <strong>Data Sharing:</strong> We do not sell or rent your personal data. We may share your information with trusted third parties for service delivery, subject to confidentiality agreements.
                            </li>

                            <li>
                                <strong>Data Security:</strong> We implement reasonable security measures to protect your information from unauthorized access or disclosure. However, no data transmission over the internet is completely secure.
                            </li>
                            <li>
                                <strong>Your Rights:</strong> You can request access to your personal data and update or delete it at any time by contacting us.             </li>

                            <li>
                                <strong>Contact Us:</strong> If you have questions about these policies, contact us at <a href="mailto:support@adoptive.com" className="text-pink-700 hover:underline">support@adoptive.com</a>.
                            </li>
                        </ol>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}
