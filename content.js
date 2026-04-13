(function () {
  "use strict";

  var COPY_ICON =
    '<svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="vertical-align:text-bottom;">' +
    '<path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>' +
    '<path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>' +
    "</svg>";

  var CHECK_ICON =
    '<svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="vertical-align:text-bottom;">' +
    '<path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>' +
    "</svg>";

  function addCopyButton() {
    if (!location.pathname.match(/\/pull\/\d+/)) return;

    // Already added
    if (document.querySelector(".gh-ext-base-copy-btn")) return;

    // Find the PR header summary container
    var container = document.querySelector('[class*="PullRequestHeaderSummary"]');
    if (!container) return;

    // Find all branch name links inside the header
    var branchLinks = container.querySelectorAll('a[class*="prc-BranchName"]');
    if (branchLinks.length === 0) return;

    // The first branch link is the base branch (after "into")
    var baseBranchLink = branchLinks[0];
    var branchName = baseBranchLink.textContent.trim();

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gh-ext-base-copy-btn";
    btn.title = branchName + " をコピー";
    btn.setAttribute("aria-label", "Copy base branch name: " + branchName);
    btn.style.cssText =
      "display:inline-flex;align-items:center;justify-content:center;" +
      "padding:4px;margin-left:4px;border:none;border-radius:6px;" +
      "background:transparent;cursor:pointer;" +
      "color:var(--fgColor-muted,#656d76);vertical-align:middle;" +
      "line-height:1;";
    btn.innerHTML = COPY_ICON;

    btn.addEventListener("mouseenter", function () {
      btn.style.background = "var(--bgColor-neutral-muted,#afb8c133)";
    });
    btn.addEventListener("mouseleave", function () {
      btn.style.background = "transparent";
    });

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(branchName).then(function () {
        btn.innerHTML = CHECK_ICON;
        btn.style.color = "var(--fgColor-success,#1a7f37)";
        setTimeout(function () {
          btn.innerHTML = COPY_ICON;
          btn.style.color = "var(--fgColor-muted,#656d76)";
        }, 2000);
      });
    });

    // Insert the button right after the base branch link
    baseBranchLink.insertAdjacentElement("afterend", btn);
  }

  // Initial run
  addCopyButton();

  // Handle GitHub SPA navigation
  document.addEventListener("turbo:load", function () {
    // Reset so button can be re-added on new page
    addCopyButton();
  });

  // Fallback: observe DOM changes with debounce
  var timer;
  new MutationObserver(function () {
    clearTimeout(timer);
    timer = setTimeout(addCopyButton, 300);
  }).observe(document.body, { childList: true, subtree: true });
})();
