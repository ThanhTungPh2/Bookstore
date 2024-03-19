async function insertHTML(id, filePath) {
    const response = await fetch(filePath);
    const htmlContent = await response.text();
    document.getElementById(id).innerHTML = htmlContent;
}

// Call the function for header and footer
insertHTML('header', '../html/header.html');
insertHTML('footer', '../html/footer.html');