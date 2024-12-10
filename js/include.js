document.addEventListener("DOMContentLoaded", () => {

  // Helper function to enable Instagram embed
  const enableInstagramEmbed = () => {
    const instagramEmbed = document.getElementById("instagram-embed-container");
    if (instagramEmbed) {
      instagramEmbed.innerHTML = `
        <div class="contact_nav text-center mx-auto">
          <h4>Instagram</h4>
          <div id="box-shadow" class="embed-responsive embed-responsive-1by1 rounded-lg">
            <iframe
              class="embed-responsive-item"
              src="https://www.instagram.com/bemore_80/embed/"
              allowfullscreen
              frameborder="0"
              scrolling="no">
            </iframe>
          </div>
        </div>`;
    }
  };

  // Function to set up event listeners for the cookie banner
  const setupCookieBanner = () => {
    const acceptButton = document.getElementById("accept-btn");
    const denyButton = document.getElementById("deny-btn");

    if (acceptButton && denyButton) {
      acceptButton.addEventListener("click", () => {
        document.getElementById("cookie-banner-placeholder").style.display = "none";
        console.log("Cookies accepted");
        enableInstagramEmbed();
        // Set cookie
        document.cookie = "cookieConsent=accepted; path=/; max-age=" + 60 * 60 * 24 * 365; // 1 year
      });

      denyButton.addEventListener("click", () => {
        document.getElementById("cookie-banner-placeholder").style.display = "none";
        console.log("Cookies denied");
        disableInstagramEmbed();
      });
    }

    // Add event listener to the "Delete Cookies" link
    const deleteCookiesLink = document.getElementById("delete-cookies-link");
    if (deleteCookiesLink) {
      deleteCookiesLink.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default action (navigation)
        deleteAllCookies(); // Call the delete cookies function
      });
    }

    if(getCookie("cookieConsent") === "accepted"){
      // Initial cookie check
      enableInstagramEmbed();
    }
  };

  // Helper function to disable Instagram embed
  const disableInstagramEmbed = () => {
    const instagramEmbed = document.getElementById("instagram-embed-container");
    if (instagramEmbed) {
      instagramEmbed.innerHTML = ""; // Clear the embed
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  // Function to delete all cookies
  const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");

    // Loop through all cookies and delete them
    cookies.forEach(cookie => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    });

    // Delete cookies for each iframe (same domain)
    const iframes = document.getElementsByTagName("iframe");
    Array.from(iframes).forEach(iframe => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const iframeCookies = iframeDoc.cookie.split(";");
        iframeCookies.forEach(cookie => {
          const cookieName = cookie.split("=")[0].trim();
          iframeDoc.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
        });
      } catch (e) {
        console.error("Unable to access iframe cookies", e);
      }
    });

    // Refresh the page after deleting cookies
    window.location.reload();
  };

  // Function to load an external HTML file into a placeholder
  const loadComponent = (placeholderId, filePath, callback) => {
    const placeholder = document.getElementById(placeholderId);

    if (placeholder) {
      fetch(filePath)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
          }
          return response.text();
        })
        .then((html) => {
          placeholder.innerHTML = html;
          if (callback) callback(); // Call the callback after the content is loaded
        })
        .catch((error) => {
          console.error(error);
          placeholder.innerHTML = `<p>Failed to load content from ${filePath}.</p>`;
        });
    } else {
      console.warn(`Placeholder with ID "${placeholderId}" not found.`);
    }
  };

  // Define components to load (ID and file path)
  const components = [
    { id: "header-placeholder", file: "header.html" },
    { id: "footer-placeholder", file: "footer.html" },
    { id: "cookie-banner-placeholder", file: "cookie-banner.html" },
  ];

  // Function to initialize cookie consent and embed logic
  const initializeConsentLogic = () => {
    if (getCookie("cookieConsent") === "accepted") {
      console.log("Cookie consent already accepted. Enabling Instagram embed.");
      enableInstagramEmbed();
      document.getElementById("cookie-banner-placeholder").style.display = "none";
    } else {
      console.log("No cookie consent detected. Showing cookie banner.");
      document.getElementById("cookie-banner-placeholder").style.display = "block";
    }
  };

  // Load each component, including event binding for the cookie banner
  components.forEach((component) => {
    const callback = component.id === "cookie-banner-placeholder" ? setupCookieBanner : null;
    loadComponent(component.id, component.file, () => {
      if (component.id === "cookie-banner-placeholder") {
        // After the cookie banner is loaded, check for cookie consent
        initializeConsentLogic();
      }
      if (callback) callback(); // Call the specific callback
    });
  });
});
