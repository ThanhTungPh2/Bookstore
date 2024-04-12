async function insertHTML(id, filePath) {
    const response = await fetch(filePath);
    const htmlContent = await response.text();
    document.getElementById(id).innerHTML = htmlContent;
}


async function loadHTML(link = '../../html/body/home.html') {
    // Chờ đợi cho header và footer được chèn vào DOM
    await insertHTML('body', link);
    
}

// Gọi hàm loadHTML()
loadHTML();