/* =========================================================
   EMAN LIVE WEBSITE — JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =======================================================
     GOOGLE PLAY BUTTON
     ======================================================= */

  const googlePlayButton = document.getElementById("googlePlayButton");

  if (googlePlayButton) {

    googlePlayButton.addEventListener("click", function (event) {

      event.preventDefault();

      showNotice(
        "Eman Live is coming soon to Google Play. 🚀"
      );

    });

  }


  /* =======================================================
     SMOOTH SCROLL
     ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


  /* =======================================================
     HEADER SCROLL EFFECT
     ======================================================= */

  const header = document.getElementById("siteHeader");

  function updateHeader() {

    if (!header) {
      return;
    }

    if (window.scrollY > 30) {

      header.style.background =
        "rgba(7, 7, 13, 0.92)";

      header.style.boxShadow =
        "0 10px 40px rgba(0,0,0,.25)";

    } else {

      header.style.background =
        "rgba(7, 7, 13, 0.72)";

      header.style.boxShadow =
        "none";

    }

  }

  window.addEventListener("scroll", updateHeader);

  updateHeader();


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const revealElements = document.querySelectorAll(
    ".feature-card, .step-card, .creator-card, .creator-stat, .download-card, .faq-list details"
  );

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      function (entries, observerInstance) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add("revealed");

            observerInstance.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(function (element) {

      element.classList.add("reveal");

      observer.observe(element);

    });

  }


  /* =======================================================
     PHONE FLOATING EFFECT
     ======================================================= */

  const phone = document.querySelector(".hero-phone-area .phone");

  if (phone && window.matchMedia("(min-width: 651px)").matches) {

    window.addEventListener("mousemove", function (event) {

      const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 2;

      const rotateY = x * 3;
      const rotateX = y * -3;

      phone.style.transform =
        `rotate(4deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });

  }


  /* =======================================================
     NOTICE / TOAST
     ======================================================= */

  function showNotice(message) {

    let notice = document.getElementById("websiteNotice");

    if (!notice) {

      notice = document.createElement("div");

      notice.id = "websiteNotice";

      notice.style.position = "fixed";
      notice.style.left = "50%";
      notice.style.bottom = "25px";
      notice.style.transform =
        "translateX(-50%) translateY(20px)";

      notice.style.zIndex = "9999";

      notice.style.padding =
        "14px 20px";

      notice.style.borderRadius =
        "999px";

      notice.style.background =
        "rgba(20,18,30,.95)";

      notice.style.border =
        "1px solid rgba(255,255,255,.12)";

      notice.style.color =
        "#ffffff";

      notice.style.fontSize =
        "13px";

      notice.style.fontWeight =
        "700";

      notice.style.boxShadow =
        "0 15px 50px rgba(0,0,0,.45)";

      notice.style.backdropFilter =
        "blur(15px)";

      notice.style.webkitBackdropFilter =
        "blur(15px)";

      notice.style.opacity = "0";

      notice.style.transition =
        "opacity .3s ease, transform .3s ease";

      document.body.appendChild(notice);

    }

    notice.textContent = message;

    requestAnimationFrame(function () {

      notice.style.opacity = "1";

      notice.style.transform =
        "translateX(-50%) translateY(0)";

    });

    clearTimeout(window.emanNoticeTimer);

    window.emanNoticeTimer = setTimeout(function () {

      notice.style.opacity = "0";

      notice.style.transform =
        "translateX(-50%) translateY(20px)";

    }, 3500);

  }


  /* =======================================================
     WEBSITE READY
     ======================================================= */

  document.body.classList.add("website-ready");

  console.log(
    "👑 Eman Live Website loaded successfully."
  );

});
