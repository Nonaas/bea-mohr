document.addEventListener("DOMContentLoaded", () => {
    // Function to load an external HTML file into a placeholder
    const loadComponent = (placeholderId, filePath) => {
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
    ];
  
    // Load each component
    components.forEach((component) => loadComponent(component.id, component.file));
  });
  