/**
 * Contact Form & Quick Action Handlers
 */

export function initContactHandler() {
  const form = document.getElementById("contact-form");
  const statusMsg = document.getElementById("form-status");
  const submitBtn = document.getElementById("form-submit-btn");
  const copySummaryBtn = document.getElementById("copy-summary-btn");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("form-name").value.trim();
      const email = document.getElementById("form-email").value.trim();
      const subject = document.getElementById("form-subject").value.trim();
      const message = document.getElementById("form-message").value.trim();

      if (!name || !email || !message) return;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Message...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span>Message Ready!</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon-right"><polyline points="20 6 9 17 4 12"/></svg>
        `;

        if (statusMsg) {
          statusMsg.style.display = "block";
          statusMsg.className = "form-status-msg success";
          statusMsg.innerHTML = `
            <strong>Thank you, ${name}!</strong> Your message has been prepared. You can also send directly via email to <a href="mailto:satyamdubey9450@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}" style="color: #00f5a0; text-decoration: underline;">satyamdubey9450@gmail.com</a>.
          `;
        }

        form.reset();
        setTimeout(() => {
          submitBtn.innerHTML = `
            <span>Send Direct Message</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon-right"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          `;
        }, 5000);
      }, 700);
    });
  }

  // Copy specs on hero terminal
  if (copySummaryBtn) {
    copySummaryBtn.addEventListener("click", () => {
      const summaryText = `Satyam Dubey | Senior Frontend & Fullstack Developer\nExperience: 7+ Years\nLocation: Noida, India\nPhone: +91 8586864294 | Email: satyamdubey9450@gmail.com\nCore Stack: React.js, Next.js, Node.js, Express/NestJS, TypeScript, GraphQL, Redis, Microservices\nKey Platforms: Axis Edge (traveledge.axis.bank.in), BCG PNB Udaan (udaan.pnb.bank.in), RedDoorz (reddoorz.com)`;
      navigator.clipboard.writeText(summaryText).then(() => {
        const span = copySummaryBtn.querySelector("span");
        if (span) {
          span.textContent = "Copied!";
          setTimeout(() => {
            span.textContent = "Copy Specs";
          }, 2000);
        }
      });
    });
  }
}
