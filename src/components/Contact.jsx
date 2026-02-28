import { useEffect, useRef, useState } from "react";
import "./Contact.css";

const CONTACT_EMAIL = "krishp744@gmail.com";
const DEFAULT_FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

const contactLinks = [
  {
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    label: "LinkedIn",
    value: "krish-patel-2725231a5",
    href: "https://www.linkedin.com/in/krish-patel-2725231a5/",
  },
  {
    label: "GitHub",
    value: "DarkLord2003",
    href: "https://github.com/DarkLord2003",
  },
];

const initialFormState = {
  name: "",
  email: "",
  message: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const buildMailtoHref = (formData = initialFormState) => {
  const subject = encodeURIComponent(
    formData.name
      ? `Portfolio inquiry from ${formData.name}`
      : "Portfolio inquiry"
  );
  const body = encodeURIComponent(
    `Name: ${formData.name || ""}\nEmail: ${formData.email || ""}\n\nMessage:\n${formData.message || ""}`
  );

  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
};

const Contact = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const configuredEndpoint = (
    import.meta.env.VITE_FORMSPREE_ENDPOINT ||
    import.meta.env.VITE_CONTACT_ENDPOINT ||
    ""
  ).trim();
  const submitEndpoint = configuredEndpoint || DEFAULT_FORM_ENDPOINT;
  const usingDefaultEndpoint = !configuredEndpoint;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.classList.add("visible");
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validateForm = () => {
    const errors = {};

    if (formData.name.trim().length < 2) {
      errors.name = "Enter your full name.";
    }

    if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Enter a valid email address.";
    }

    if (formData.message.trim().length < 20) {
      errors.message = "Message should be at least 20 characters.";
    }

    return errors;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic honeypot: bots filling this hidden field are ignored.
    const botField = event.currentTarget.elements.company?.value;
    if (botField) return;

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setFormStatus("error");
      setStatusMessage("Please fix the highlighted fields and resubmit.");
      return;
    }

    setFormStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch(submitEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "krish-portfolio-site",
          submittedAt: new Date().toISOString(),
          _replyto: formData.email,
          _subject: `Portfolio inquiry from ${formData.name}`,
          ...(usingDefaultEndpoint
            ? {
                _captcha: "false",
                _template: "table",
              }
            : {}),
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setFormStatus("success");
      setStatusMessage(
        "Message sent successfully. I will get back to you shortly."
      );
      setFormData(initialFormState);
    } catch {
      setFormStatus("error");
      setStatusMessage(
        "Submission failed. Use the Email Instead button below."
      );
    }
  };

  const resetFormState = () => {
    setFormStatus("idle");
    setStatusMessage("");
    setFormErrors({});
    setFormData(initialFormState);
  };

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-container">
        <div className="contact-text">
          <span className="eyebrow">Contact</span>
          <h2>
            Let’s build something <span>remarkable</span> together.
          </h2>
          <p>
            Whether you’re launching a new idea or refining an existing product,
            I’d love to help. Share a quick overview and we’ll take it from
            there.
          </p>
          <div className="contact-actions">
            <a className="contact-primary" href="#contact-form">
              Send a Message
            </a>
            <a className="contact-secondary" href="#projects">
              View Work
            </a>
          </div>
        </div>

        <div className="contact-card">
          <h3>Contact Form</h3>
          <p className="contact-card-subtext">
            Direct form delivery is active. If it fails, use the email fallback.
          </p>

          {formStatus === "success" || formStatus === "fallback" ? (
            <div className="contact-success" role="status" aria-live="polite">
              <h4>Message Ready</h4>
              <p>{statusMessage}</p>
              <div className="contact-success-actions">
                <button
                  type="button"
                  className="contact-reset-btn"
                  onClick={resetFormState}
                >
                  Send Another Message
                </button>
                <a href={`mailto:${CONTACT_EMAIL}`}>Email Directly</a>
              </div>
            </div>
          ) : (
            <form
              id="contact-form"
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <input
                type="text"
                name="company"
                tabIndex="-1"
                autoComplete="off"
                className="field-honeypot"
                aria-hidden="true"
              />

              <label className="field">
                Name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  autoComplete="name"
                  placeholder="Your full name"
                  aria-invalid={Boolean(formErrors.name)}
                />
                {formErrors.name ? <small>{formErrors.name}</small> : null}
              </label>

              <label className="field">
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={Boolean(formErrors.email)}
                />
                {formErrors.email ? <small>{formErrors.email}</small> : null}
              </label>

              <label className="field">
                Message
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project, role, or collaboration idea."
                  aria-invalid={Boolean(formErrors.message)}
                />
                {formErrors.message ? <small>{formErrors.message}</small> : null}
              </label>

              <div className="contact-form-actions">
                <button type="submit" disabled={formStatus === "submitting"}>
                  {formStatus === "submitting" ? "Sending..." : "Submit Message"}
                </button>
                <a
                  className="contact-email-fallback"
                  href={buildMailtoHref(formData)}
                >
                  Email Instead
                </a>
              </div>

              {statusMessage ? (
                <p className={`form-status ${formStatus}`}>{statusMessage}</p>
              ) : null}
            </form>
          )}

          <div className="contact-links">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
