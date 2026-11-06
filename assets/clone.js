(function () {
  "use strict";

  // Live Black Friday countdown (deadline taken from captured homepage copy:
  // "Ends November 30, 2026 at 11:59 PM Pacific Time." PST = UTC-8)
  var DEADLINE = Date.parse("2026-12-01T07:59:00Z");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function partsRemaining() {
    var ms = Math.max(0, DEADLINE - Date.now());
    var sec = Math.floor(ms / 1000);
    return {
      days: Math.floor(sec / 86400),
      hours: Math.floor((sec % 86400) / 3600),
      minutes: Math.floor((sec % 3600) / 60),
      seconds: sec % 60,
      label:
        "Offer ends in " +
        pad(Math.floor(sec / 86400)) +
        ":" +
        pad(Math.floor((sec % 86400) / 3600)) +
        ":" +
        pad(Math.floor((sec % 3600) / 60)) +
        ":" +
        pad(sec % 60),
    };
  }

  function updateTimers() {
    var p = partsRemaining();
    var vals = [pad(p.days), pad(p.hours), pad(p.minutes), pad(p.seconds)];
    document.querySelectorAll('[role="timer"]').forEach(function (el) {
      el.setAttribute("aria-label", p.label);
      var nums = Array.prototype.filter.call(el.querySelectorAll("span"), function (s) {
        return s.children.length === 0 && /^\d+$/.test((s.textContent || "").trim());
      });
      if (nums.length >= 4) {
        for (var i = 0; i < 4; i++) nums[i].textContent = vals[i];
      }
    });
  }

  updateTimers();
  setInterval(updateTimers, 1000);

  function scrollerNear(btn) {
    var root = btn.parentElement;
    for (var i = 0; i < 6 && root; i++) {
      var found = root.querySelector(".overflow-x-auto");
      if (found) return found;
      root = root.parentElement;
    }
    return null;
  }

  document.querySelectorAll("button[aria-label]").forEach(function (btn) {
    var label = btn.getAttribute("aria-label") || "";
    if (label.indexOf("Next ") === 0) {
      btn.addEventListener("click", function () {
        var scroller = scrollerNear(btn);
        if (scroller) {
          scroller.scrollBy({ left: Math.max(280, scroller.clientWidth * 0.8), behavior: "smooth" });
        }
      });
    }
  });

  var themeBtn = document.querySelector('[aria-label="Toggle theme"]');
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var root = document.documentElement;
      var dark = root.classList.contains("dark");
      root.classList.toggle("dark", !dark);
      root.classList.toggle("light", dark);
    });
  }

  var promo = document.querySelector("[data-promo-banner]");
  if (promo) {
    var dismiss = promo.querySelector('[aria-label="Dismiss"], [data-testid="pro-plan-banner"] button');
    // last button in the banner is typically Dismiss (X)
    if (!dismiss) {
      var buttons = promo.querySelectorAll("button");
      dismiss = buttons[buttons.length - 1];
    }
    if (dismiss) {
      dismiss.addEventListener("click", function (e) {
        e.preventDefault();
        promo.remove();
        document.documentElement.style.removeProperty("--promo-banner-height");
      });
    }
  }

  // Do not impersonate auth or checkout — send those actions to the original site.
  function redirectOriginal(path) {
    window.location.href = "https://skillry.dev" + path;
  }

  document.querySelectorAll("button").forEach(function (btn) {
    var text = (btn.textContent || "").replace(/\s+/g, " ").trim();
    var label = (btn.getAttribute("aria-label") || "").trim();
    if (text === "Subscribe to Pro" || text === "Get lifetime access") {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        redirectOriginal("/pricing");
      });
    } else if (text === "Sign In" || label === "Sign In") {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        redirectOriginal("/");
      });
    } else if (text === "Connect Skillry") {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        redirectOriginal("/");
      });
    } else if (label === "Search Skills" || text.indexOf("What do you want to create") !== -1) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        redirectOriginal("/skills");
      });
    } else if (text === "Request a Skill" || label === "Request a Skill") {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        redirectOriginal("/");
      });
    }
  });

  document.querySelectorAll("form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  });

  var shot = new URLSearchParams(window.location.search).get("shot");
  if (shot) {
    var target = document.getElementById(shot);
    if (target) target.scrollIntoView({ behavior: "auto", block: "start" });
  }
})();
