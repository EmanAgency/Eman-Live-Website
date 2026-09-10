"use strict";

/* =========================================================
   EMAN LIVE WEBSITE
   SIMPLE WEBSITE JAVASCRIPT
========================================================= */


/* =========================================================
   GOOGLE PLAY BUTTON
========================================================= */

const playStoreButton =
  document.getElementById("playStoreButton");


if (playStoreButton) {

  playStoreButton.addEventListener(
    "click",
    function (event) {

      /*
       * The Eman Live Android app has not
       * been published yet.
       *
       * When Google Play gives us the
       * official app URL, replace the "#"
       * in index.html with that URL.
       */

      event.preventDefault();

      showNotice(
        "Eman Live is coming soon to Google Play."
      );

    }
  );

}


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(
    function (link) {

      link.addEventListener(
        "click",
        function (event) {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(
              targetId
            );

          if (!target) {
            return;
          }

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    }
  );


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const header =
  document.querySelector(
    ".site-header"
  );


function updateHeader() {

  if (!header) return;

  if (window.scrollY > 20) {

    header.style.background =
      "rgba(8, 8, 8, 0.96)";

  } else {

    header.style.background =
      "rgba(8, 8, 8, 0.88)";

  }

}


window.addEventListener(
  "scroll",
  updateHeader,
  {
    passive: true
  }
);


updateHeader();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(
    ".feature-card, .step-card, .stat-card, .faq-item"
  );


if (
  "IntersectionObserver" in window
) {

  const observer =
    new IntersectionObserver(
      function (entries) {

        entries.forEach(
          function (entry) {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(
    function (element) {

      observer.observe(
        element
      );

    }
  );

} else {

  revealElements.forEach(
    function (element) {

      element.classList.add(
        "visible"
      );

    }
  );

}


/* =========================================================
   SIMPLE NOTICE
========================================================= */

function showNotice(message) {

  const existing =
    document.getElementById(
      "emanNotice"
    );


  if (existing) {

    existing.remove();

  }


  const notice =
    document.createElement(
      "div"
    );


  notice.id =
    "emanNotice";


  notice.textContent =
    message;


  notice.style.position =
    "fixed";

  notice.style.left =
    "50%";

  notice.style.bottom =
    "25px";

  notice.style.transform =
    "translateX(-50%)";

  notice.style.zIndex =
    "9999";

  notice.style.width =
    "min(90%, 420px)";

  notice.style.padding =
    "14px 18px";

  notice.style.borderRadius =
    "14px";

  notice.style.background =
    "#ffffff";

  notice.style.color =
    "#080808";

  notice.style.textAlign =
    "center";

  notice.style.fontSize =
    "13px";

  notice.style.fontWeight =
    "750";

  notice.style.boxShadow =
    "0 15px 40px rgba(0,0,0,.45)";


  document.body.appendChild(
    notice
  );


  setTimeout(
    function () {

      notice.style.opacity =
        "0";

      notice.style.transition =
        "opacity .3s ease";


      setTimeout(
        function () {

          notice.remove();

        },
        300
      );

    },
    2600
  );

}


/* =========================================================
   YEAR
========================================================= */

const yearElements =
  document.querySelectorAll(
    ".copyright"
  );


yearElements.forEach(
  function (element) {

    element.textContent =
      "© " +
      new Date().getFullYear() +
      " Eman Live. All rights reserved.";

  }
);


/* =========================================================
   PAGE READY
========================================================= */

document.body.classList.add(
  "website-ready"
);

console.log(
  "Eman Live website loaded successfully."
);
