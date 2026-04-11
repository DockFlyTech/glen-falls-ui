"use client";

import { useState } from "react";
import {
  MapPinIcon,
  ClockIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { FollowUsBox } from "@/components/FollowUsBox";
import { SubscribeBox } from "@/components/SubscribeBox";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="max-w-[1400px] mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <h1 className="text-5xl font-playfair font-bold mb-4 tracking-tight">
            Contact Us
          </h1>
          <div className="w-20 h-[3px] bg-accent-gold mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Office Location */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-accent-gold-light flex items-center justify-center rounded-full flex-shrink-0">
                <MapPinIcon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-lg font-playfair font-bold mb-2">
                  Our Office
                </h2>
                <p className="font-lora text-text-secondary">
                  15 Ridge Street
                  <br />
                  Glens Falls, NY 12801
                </p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-accent-gold-light flex items-center justify-center rounded-full flex-shrink-0">
                <ClockIcon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-lg font-playfair font-bold mb-2">
                  Office Hours
                </h2>
                <p className="font-lora text-text-secondary">
                  Monday to Friday
                  <br />
                  9 a.m. to 5 p.m.
                </p>
              </div>
            </div>

            {/* Mailing Address */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-accent-gold-light flex items-center justify-center rounded-full flex-shrink-0">
                <EnvelopeIcon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-lg font-playfair font-bold mb-2">
                  Mailing Address
                </h2>
                <p className="font-lora text-text-secondary">
                  P.O. Box 153
                  <br />
                  Glens Falls, NY 12801
                </p>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-accent-gold-light flex items-center justify-center rounded-full flex-shrink-0">
                <PhoneIcon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-lg font-playfair font-bold mb-2">
                  Phone & Email
                </h2>
                <p className="font-lora text-text-secondary">
                  <a
                    href="tel:+15187921126"
                    className="hover:text-accent transition-colors"
                  >
                    (518) 792-1126
                  </a>
                  <br />
                  <span className="text-text-tertiary">Fax: (518) 793-1587</span>
                  <br />
                  <a
                    href="mailto:chronicle@loneoak.com"
                    className="text-accent hover:text-accent-hover transition-colors"
                  >
                    chronicle@loneoak.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="mb-12">
            <h2 className="text-2xl font-playfair font-bold mb-4">
              Find Us
            </h2>
            <div className="aspect-[16/9] w-full overflow-hidden shadow-lg border border-rule">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2907.1876789876543!2d-73.6447!3d43.3106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89de4e3b5c7b8b8d%3A0x1234567890abcdef!2s15%20Ridge%20St%2C%20Glens%20Falls%2C%20NY%2012801!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Chronicle Office Location"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-playfair font-bold mb-6">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="bg-accent-gold-light border border-accent-gold/30 p-6 text-center">
                <p className="font-lora text-lg text-text-primary">
                  Thank you for your message! We&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-text-secondary mb-2 font-libre-franklin"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-rule bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-lora"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-text-secondary mb-2 font-libre-franklin"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-rule bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-lora"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-text-secondary mb-2 font-libre-franklin"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-rule bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-lora"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-text-secondary mb-2 font-libre-franklin"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-rule bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-lora resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3 bg-accent text-white font-bold font-libre-franklin uppercase tracking-widest text-[13px] hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 flex flex-col gap-10 lg:border-l lg:border-rule lg:pl-10">
          <SubscribeBox />
          <FollowUsBox />
        </div>
      </div>
    </main>
  );
}
